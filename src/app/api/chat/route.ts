import { NextResponse } from "next/server";
import { getSite } from "@/lib/tenant";
import { prisma } from "@/lib/db";
import { aiChat, buildSystemPrompt } from "@/lib/ai";
import { notifyTelegram } from "@/lib/notify";

// Regex teléfono ES: +34 / 0034 / 6XX / 7XX / 9XX
const PHONE_RE = /(\+?34|0034)?[\s.-]?(\d[\s.-]?){9}/;

export async function POST(req: Request) {
  const site = await getSite();
  if (!site || !site.aiEnabled) {
    return NextResponse.json({ error: "Chat no disponible" }, { status: 404 });
  }

  let body: { message?: string; history?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const message = body.message?.trim().slice(0, 1000);
  if (!message) return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });

  // Cost cap: cuota mensual por sitio
  if (site.aiUsed >= site.aiQuota) {
    return NextResponse.json({
      reply: `Hemos alcanzado el límite de conversaciones de este mes. Escríbenos por WhatsApp${site.whatsapp ? `: +${site.whatsapp}` : ""} y te atendemos al momento.`,
    });
  }

  const history = (body.history ?? [])
    .filter((m) => ["user", "assistant"].includes(m.role))
    .slice(-8)
    .map((m) => ({ role: m.role as "user" | "assistant", content: String(m.content).slice(0, 1000) }));

  let reply: string;
  try {
    reply = await aiChat(buildSystemPrompt(site), [...history, { role: "user", content: message }]);
  } catch (err) {
    console.error("AI error:", err);
    return NextResponse.json({
      reply: "Ahora mismo no puedo responder. Escríbenos por WhatsApp y te atendemos enseguida.",
    });
  }

  await prisma.$transaction([
    prisma.chatMessage.createMany({
      data: [
        { siteId: site.id, role: "user", content: message },
        { siteId: site.id, role: "assistant", content: reply },
      ],
    }),
    prisma.site.update({ where: { id: site.id }, data: { aiUsed: { increment: 1 } } }),
  ]);

  // Lead automático: el usuario dejó un teléfono en el chat
  const phoneMatch = message.match(PHONE_RE)?.[0].replace(/[\s.-]/g, "");
  if (phoneMatch && phoneMatch.length >= 9) {
    await prisma.lead.create({
      data: { siteId: site.id, name: "Chat IA", phone: phoneMatch, message, source: "chat" },
    });
    await notifyTelegram(
      `[CHAT] <b>Lead de chat IA</b> — ${site.name}\nTel: ${phoneMatch}\nMsg: ${message.slice(0, 200)}`
    );
  }

  return NextResponse.json({ reply });
}
