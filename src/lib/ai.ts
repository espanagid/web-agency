// Abstracción de proveedor IA: mistral | openai | deepseek (OpenAI-compatible).
// Añadir otro proveedor = 2 líneas aquí, sin tocar el resto del código.

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const ENDPOINTS: Record<string, string> = {
  mistral: "https://api.mistral.ai/v1/chat/completions",
  openai: "https://api.openai.com/v1/chat/completions",
  deepseek: "https://api.deepseek.com/v1/chat/completions", // OpenAI-compatible
};

const DEFAULT_MODELS: Record<string, string> = {
  mistral: "mistral-small-latest",
  openai: "gpt-4o-mini",
  deepseek: "deepseek-flash", // deepseek-chat fue descontinuado
};

export async function aiChat(system: string, messages: ChatMessage[]): Promise<string> {
  const provider = (process.env.AI_PROVIDER ?? "mistral").toLowerCase();
  const url = ENDPOINTS[provider] ?? ENDPOINTS.mistral;
  const model = process.env.AI_MODEL || DEFAULT_MODELS[provider] || DEFAULT_MODELS.mistral;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.AI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "system", content: system }, ...messages],
      max_tokens: 400, // cost cap: límite duro por respuesta
      temperature: 0.4,
    }),
    signal: AbortSignal.timeout(20000),
  });

  if (!res.ok) {
    throw new Error(`AI provider error ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Disculpa, no pude procesar tu mensaje.";
}

export function buildSystemPrompt(site: {
  name: string;
  tagline?: string | null;
  sector?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  hours?: string | null;
  aiPrompt?: string | null;
  sections: { type: string; content: unknown }[];
}): string {
  const services = site.sections.find((s) => s.type === "services");
  const items = services
    ? (services.content as { items?: { name: string; price?: string; desc?: string }[] }).items ?? []
    : [];

  const faqSection = site.sections.find((s) => s.type === "faq");
  const faqs = faqSection
    ? (faqSection.content as { items?: { q: string; a: string }[] }).items ?? []
    : [];

  const lines = [
    `Eres la recepcionista virtual de "${site.name}"${site.tagline ? ` (${site.tagline})` : ""}.`,
    `Sector: ${site.sector ?? "negocio local"}.`,
    "",
    "REGLAS:",
    "- Responde SIEMPRE en el idioma del visitante (español, ruso o inglés), de forma breve, cálida y profesional (máx. 3 frases por mensaje).",
    "- Tu objetivo: ayudar al cliente a RESERVAR o dejar sus datos de contacto. Pregunta servicio deseado y horario preferido.",
    "- Cuando tengas servicio + hora + nombre, invita a confirmar por WhatsApp" + (site.whatsapp ? ` (${site.whatsapp})` : "")
    + "  con un mensaje ya redactado para copiar y pegar.",
    "- NUNCA inventes precios ni servicios que no estén en la lista. Si no sabes algo, di que lo confirman por WhatsApp.",
    "- Si te piden algo fuera de tu alcance (quejas, cambios urgentes), pasa el contacto al negocio por WhatsApp.",
    "",
    "DATOS DEL NEGOCIO:",
    site.hours ? `- Horario: ${site.hours}` : "",
    site.address ? `- Dirección: ${site.address}` : "",
    items.length ? "- Servicios y precios:" : "- Pregunta por WhatsApp para precios.",
    ...items.map((i) => `  * ${i.name}${i.price ? ` — ${i.price}` : ""}${i.desc ? ` (${i.desc})` : ""}`),
    "",
    ...(faqs.length
      ? ["Preguntas frecuentes:", ...faqs.map((f) => `  * ${f.q} → ${f.a}`), ""]
      : []),
    site.aiPrompt ?? "",
  ];

  return lines.filter(Boolean).join("\n");
}
