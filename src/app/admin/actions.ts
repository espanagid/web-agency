"use server";

import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Server actions NO heredan la auth del layout: cada action valida por sí misma.
async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("No autorizado");
}

function defaultSections(name: string) {
  return [
    { type: "hero", order: 0, content: { title: name, subtitle: "", cta: "Reservar cita" } },
    {
      type: "services",
      order: 1,
      content: {
        title: "Servicios y precios",
        items: [
          { name: "Servicio 1", price: "", desc: "" },
          { name: "Servicio 2", price: "", desc: "" },
        ],
      },
    },
    {
      type: "testimonials",
      order: 2,
      content: {
        title: "Opiniones",
        items: [{ text: "", author: "Cliente" }],
      },
    },
    { type: "contact", order: 3, content: { title: "Reserva tu cita", note: "" } },
  ];
}

export async function createSite(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");
  const whatsapp = String(formData.get("whatsapp") ?? "").replace(/\D/g, "");

  if (!name || !slug) return;

  const site = await prisma.site.create({
    data: {
      name,
      slug,
      whatsapp: whatsapp || null,
      plan: String(formData.get("plan") ?? "presencia"),
      sections: { create: defaultSections(name) },
    },
  });

  revalidatePath("/admin");
  redirect(`/admin/sites/${site.id}`);
}

export async function updateSite(siteId: string, formData: FormData) {
  await requireAdmin();

  const str = (k: string) => String(formData.get(k) ?? "").trim() || null;
  const bool = (k: string) => formData.get(k) === "on";

  let sectionsJson: unknown = null;
  try {
    sectionsJson = JSON.parse(String(formData.get("sections") ?? "[]"));
  } catch {
    // JSON inválido: no tocamos las secciones
  }

  await prisma.site.update({
    where: { id: siteId },
    data: {
      name: str("name") ?? "",
      slug: String(formData.get("slug") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      domain: str("domain"),
      tagline: str("tagline"),
      sector: str("sector"),
      phone: str("phone"),
      whatsapp: str("whatsapp")?.replace(/\D/g, ""),
      email: str("email"),
      address: str("address"),
      hours: str("hours"),
      plan: str("plan") ?? "presencia",
      aiEnabled: bool("aiEnabled"),
      published: bool("published"),
      aiQuota: Number(formData.get("aiQuota") ?? 500) || 500,
      aiPrompt: str("aiPrompt"),
      colors: {
        primary: str("colorPrimary") ?? "#0f766e",
        accent: str("colorAccent") ?? "#f59e0b",
      },
    },
  });

  if (Array.isArray(sectionsJson)) {
    await prisma.$transaction([
      prisma.section.deleteMany({ where: { siteId } }),
      prisma.section.createMany({
        data: sectionsJson
          .filter((s: any) => s?.type)
          .map((s: any, i: number) => ({
            siteId,
            type: String(s.type),
            order: Number(s.order ?? i),
            content: s.content ?? {},
          })),
      }),
    ]);
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/sites/${siteId}`);
}

export async function deleteSite(siteId: string) {
  await requireAdmin();

  await prisma.site.delete({ where: { id: siteId } });
  revalidatePath("/admin");
  redirect("/admin");
}

export async function markLeadHandled(leadId: string) {
  await requireAdmin();

  await prisma.lead.update({ where: { id: leadId }, data: { handled: true } });
  revalidatePath("/admin/leads");
}
