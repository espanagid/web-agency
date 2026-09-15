import nodemailer from "nodemailer";

/**
 * Уведомление владельцу о новой заявке.
 * Работает, когда в .env задан SMTP_URL (например,
 * smtps://user:pass@smtp.zoho.eu:465). Без SMTP_URL — просто пропускаем,
 * заявка всё равно сохраняется в CRM.
 */

const SMTP_URL = process.env.SMTP_URL || "";
const MAIL_TO = process.env.MAIL_TO || "hola@webalo.eu";
const MAIL_FROM = process.env.MAIL_FROM || "Webalo <hola@webalo.eu>";

export async function notifyLead(lead: {
  id: number;
  name?: string;
  contact?: string;
  businessName?: string;
  summary?: string;
  filesCount: number;
}): Promise<void> {
  if (!SMTP_URL) return; // почта не настроена — не блокируем заявку
  try {
    const transport = nodemailer.createTransport(SMTP_URL);
    await transport.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `🔥 Nueva solicitud #${lead.id} — ${lead.name || "sin nombre"}`,
      text: [
        `ID: ${lead.id}`,
        `Nombre: ${lead.name || "-"}`,
        `Contacto: ${lead.contact || "-"}`,
        `Negocio: ${lead.businessName || "-"}`,
        `Archivos: ${lead.filesCount}`,
        "",
        lead.summary || "",
        "",
        `Admin: https://webalo.eu/admin`,
      ].join("\n"),
    });
  } catch (e) {
    console.error("[mail] notify failed:", (e as Error).message);
  }
}
