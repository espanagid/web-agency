import { NextResponse } from "next/server";
import { getSite } from "@/lib/tenant";
import { prisma } from "@/lib/db";
import { notifyTelegram } from "@/lib/notify";

export async function POST(req: Request) {
  const site = await getSite();
  if (!site) return NextResponse.json({ error: "Sitio no encontrado" }, { status: 404 });

  let body: { name?: string; phone?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = body.name?.trim().slice(0, 120);
  const phone = body.phone?.trim().slice(0, 30);
  if (!name || !phone) {
    return NextResponse.json({ error: "Nombre y teléfono son obligatorios" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      siteId: site.id,
      name,
      phone,
      email: body.email?.trim().slice(0, 120) || null,
      message: body.message?.trim().slice(0, 1000) || null,
      source: "form",
    },
  });

  await notifyTelegram(
    `[LEAD] <b>Nuevo lead — ${site.name}</b>\nNombre: ${name}\nTel: ${phone}\nMsg: ${lead.message ?? "-"}`
  );

  return NextResponse.json({ ok: true });
}
