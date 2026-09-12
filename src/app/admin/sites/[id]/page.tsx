import { prisma } from "@/lib/db";
import { updateSite, deleteSite } from "../../actions";
import { DeleteSiteButton } from "@/components/DeleteSiteButton";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditSitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const site = await prisma.site.findUnique({
    where: { id },
    include: { sections: { orderBy: { order: "asc" } }, leads: { orderBy: { createdAt: "desc" }, take: 20 } },
  });
  if (!site) notFound();

  const colors = (site.colors ?? {}) as { primary?: string; accent?: string };
  const update = updateSite.bind(null, site.id);
  const remove = deleteSite.bind(null, site.id);

  const input =
    "w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:outline-none";
  const label = "text-sm font-medium";

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{site.name}</h1>
        <a
          href={`https://${site.slug}.${process.env.BASE_DOMAIN ?? "localhost:3000"}`}
          target="_blank"
          className="rounded-xl border bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50"
        >
          Ver sitio ↗
        </a>
      </div>

      <form action={update} className="space-y-6 rounded-2xl border bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label}>Nombre</label><input name="name" defaultValue={site.name} className={input} /></div>
          <div><label className={label}>Subdominio (slug)</label><input name="slug" defaultValue={site.slug} className={input} /></div>
          <div><label className={label}>Dominio propio (opcional)</label><input name="domain" defaultValue={site.domain ?? ""} placeholder="www.elcorte.es" className={input} /></div>
          <div><label className={label}>Sector</label><input name="sector" defaultValue={site.sector ?? ""} placeholder="barberia" className={input} /></div>
          <div><label className={label}>Tagline</label><input name="tagline" defaultValue={site.tagline ?? ""} className={input} /></div>
          <div><label className={label}>Email</label><input name="email" defaultValue={site.email ?? ""} className={input} /></div>
          <div><label className={label}>Teléfono</label><input name="phone" defaultValue={site.phone ?? ""} className={input} /></div>
          <div><label className={label}>WhatsApp (dígitos)</label><input name="whatsapp" defaultValue={site.whatsapp ?? ""} className={input} /></div>
          <div><label className={label}>Dirección</label><input name="address" defaultValue={site.address ?? ""} className={input} /></div>
          <div><label className={label}>Horario</label><input name="hours" defaultValue={site.hours ?? ""} placeholder="Lun–Sáb 9:30–20:00" className={input} /></div>
          <div><label className={label}>Color principal</label><input name="colorPrimary" type="color" defaultValue={colors.primary ?? "#0f766e"} className="h-10 w-full rounded-xl border border-slate-300" /></div>
          <div><label className={label}>Color acento</label><input name="colorAccent" type="color" defaultValue={colors.accent ?? "#f59e0b"} className="h-10 w-full rounded-xl border border-slate-300" /></div>
          <div>
            <label className={label}>Plan</label>
            <select name="plan" defaultValue={site.plan} className={input}>
              <option value="presencia">Presencia — 490€</option>
              <option value="recepcion">Recepción IA — 990€</option>
              <option value="todo-incluido">Todo Incluido — 59€/mes</option>
            </select>
          </div>
          <div><label className={label}>Cuota IA (conversaciones/mes)</label><input name="aiQuota" type="number" defaultValue={site.aiQuota} className={input} /></div>
        </div>

        <div>
          <label className={label}>Instrucciones extra para el asistente IA</label>
          <textarea name="aiPrompt" rows={3} defaultValue={site.aiPrompt ?? ""} placeholder="Ej.: Si preguntan por alergias, recomendar siempre consultar en persona…" className={input} />
        </div>

        <div>
          <label className={label}>Secciones (JSON)</label>
          <textarea
            name="sections"
            rows={16}
            defaultValue={JSON.stringify(site.sections, null, 2)}
            className={`${input} font-mono text-xs`}
          />
          <p className="mt-1 text-xs text-slate-500">
            Tipos: hero, services, testimonials, faq, contact.
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="published" defaultChecked={site.published} /> Publicado
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" name="aiEnabled" defaultChecked={site.aiEnabled} /> Asistente IA activo
          </label>
        </div>

        <div className="flex gap-3">
          <button className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white">
            Guardar cambios
          </button>
        </div>
      </form>

      <form action={remove}>
        <DeleteSiteButton action={async () => {}} />
      </form>

      <div className="rounded-2xl border bg-white p-6">
        <h2 className="font-bold">Últimos leads ({site.leads.length})</h2>
        {site.leads.length === 0 && <p className="mt-3 text-sm text-slate-500">Sin leads todavía.</p>}
        <div className="mt-4 space-y-2">
          {site.leads.map((l) => (
            <div key={l.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm">
              <span className="font-semibold">{l.name}</span>
              {l.phone && <a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" className="text-[var(--color-primary)] underline">{l.phone}</a>}
              <span className="text-slate-500">{l.message}</span>
              <span className="ml-auto rounded-full bg-slate-200 px-2 py-0.5 text-xs">{l.source}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
