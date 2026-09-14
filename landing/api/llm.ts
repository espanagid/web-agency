import type { Hono } from "hono";
import type { HttpBindings } from "@hono/node-server";

/**
 * LLM-агент приёма заявок (DeepSeek, OpenAI-совместимый API).
 * Ключ живёт только на сервере (DEEPSEEK_API_KEY в .env).
 */

const LLM_URL = process.env.LLM_BASE_URL || "https://api.deepseek.com/chat/completions";
const MODEL = process.env.LLM_MODEL || "deepseek-chat";

const SYSTEM_PROMPT = `Eres el asistente de admisión de Webalo (webalo.eu), una agencia española que crea webs con recepcionista de IA para pymes. Tu objetivo: preparar el brief para una DEMO WEB GRATUITA que se entrega en 72 horas.

IDIOMA: responde SIEMPRE en el idioma del último mensaje del usuario (español, inglés, ruso u otro). Si el usuario cambia de idioma, cambia tú también, sin comentarlo.

ESTILO: cálido, profesional y breve. Mensajes cortos (1–3 frases) y UNA sola pregunta por mensaje. Emojis con moderación (máx. 1). Nunca inventes precios de servicios del cliente ni datos que no te hayan dado.

DATOS A RECOGER (en este orden, de forma conversacional):
1. Nombre del cliente
2. Nombre del negocio
3. Sector / a qué se dedica
4. Descripción libre: servicios, precios, horarios, zona (anímale a pegar texto de su web antigua o Instagram)
5. Colores preferidos (puede decir «que decidáis vosotros»)
6. Si tiene logotipo (sí / no, generadme uno)
7. Contacto: WhatsApp o email para enviar la demo (comprueba que parezca válido; si no, pide corrección amablemente)
8. Algo más que debamos saber (opcional)

ARCHIVOS: en algún momento ANTES del contacto, invita al usuario a adjuntar logo, fotos de su trabajo, PDFs o textos. Cuando lo hagas, añade el token <<ASK_FILES>> al final de tu mensaje (una sola vez en toda la conversación). El usuario puede subir archivos o saltar el paso; el sistema te lo indicará.

FINAL: cuando tengas todos los datos, muestra un resumen breve del brief en el idioma del usuario y, en la ÚLTIMA línea, emite exactamente:
<<BRIEF>>{"name":"...","business":"...","sector":"...","desc":"...","colors":"...","logo":"yes|generate","contact":"...","extra":"..."}<</BRIEF>>

RESPUESTAS A PREGUNTAS FRECUENTES (úsalas si preguntan):
- Precio: la demo es 100% gratis y sin compromiso. Tarifas tras la demo: Start 490 € (pago único, 0 € de cuota el primer año), Business 990 € + 39 €/mes (IA 24/7), reconstrucción de web antigua 399 € / 899 €, publicidad en Instagram 300 € + 199 €/mes.
- Plazos: demo en 72 horas; web completa tras la demo, de 5 a 12 días laborables.
- Si no le gusta la demo: no pasa nada, no continúa y ya está, sin pagos ni obligaciones.
- Hablar con humano: WhatsApp +34 603 081 081, respuesta en menos de 2 horas.
- Qué es Webalo: webs que responden solas — recepcionista IA que contesta, cualifica y agenda citas por WhatsApp 24/7.

Si el usuario escribe algo sin sentido o fuera de tema, responde con naturalidad y redirige amablemente a la siguiente pregunta del brief. Nunca digas que eres un modelo de lenguaje ni menciones a DeepSeek: eres el asistente de Webalo.`;

/** простой rate-limit по IP: 40 сообщений в час */
const rate = new Map<string, { count: number; reset: number }>();

type Msg = { role: string; content: string };

export function registerLlmRoute(app: Hono<{ Bindings: HttpBindings }>) {
  app.post("/api/llm-chat", async (c) => {
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) return c.json({ error: "llm_unavailable" }, 503);

    const ip =
      c.req.header("x-real-ip") || (c.req.header("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
    const now = Date.now();
    const slot = rate.get(ip);
    if (!slot || slot.reset < now) {
      rate.set(ip, { count: 1, reset: now + 3600_000 });
    } else {
      if (slot.count >= 40) return c.json({ error: "rate_limited" }, 429);
      slot.count++;
    }

    let messages: Msg[];
    try {
      const body = await c.req.json();
      if (!Array.isArray(body?.messages)) return c.json({ error: "bad_request" }, 400);
      messages = body.messages
        .slice(-24)
        .map((m: Msg) => ({
          role: m?.role === "assistant" ? "assistant" : "user",
          content: String(m?.content ?? "").slice(0, 3000),
        }))
        .filter((m: Msg) => m.content.trim());
    } catch {
      return c.json({ error: "bad_request" }, 400);
    }

    try {
      const resp = await fetch(LLM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({
          model: MODEL,
          temperature: 0.6,
          max_tokens: 700,
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        }),
        signal: AbortSignal.timeout(45_000),
      });
      if (!resp.ok) return c.json({ error: "llm_error", status: resp.status }, 502);
      const j = (await resp.json()) as { choices?: { message?: { content?: string } }[] };
      return c.json({ reply: j.choices?.[0]?.message?.content ?? "" });
    } catch {
      return c.json({ error: "llm_error" }, 502);
    }
  });
}
