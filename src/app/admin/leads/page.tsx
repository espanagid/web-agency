import { prisma } from "@/lib/db";
import { markLeadHandled } from "../actions";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { site: { select: { name: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Leads</h1>
      {leads.length === 0 && <p className="mt-4 text-sm text-slate-500">Aún no hay leads.</p>}
      <div className="mt-6 space-y-2">
        {leads.map((l) => (
          <div
            key={l.id}
            className={`flex flex-wrap items-center gap-3 rounded-xl border bg-white px-4 py-3 text-sm ${l.handled ? "opacity-50" : ""}`}
          >
            <span className="font-semibold">{l.name}</span>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{l.site.name}</span>
            {l.phone && (
              <a href={`https://wa.me/${l.phone.replace(/\D/g, "")}`} target="_blank" className="underline">
                {l.phone}
              </a>
            )}
            <span className="text-slate-500">{l.message}</span>
            <span className="ml-auto text-xs text-slate-400">
              {l.createdAt.toLocaleString("es-ES")}
            </span>
            {!l.handled && (
              <form action={markLeadHandled.bind(null, l.id)}>
                <button className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50">✓ Gestionado</button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
