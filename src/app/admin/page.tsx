import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

const PLAN_LABEL: Record<string, string> = {
  presencia: "Presencia (490€)",
  recepcion: "Recepción IA (990€)",
  "todo-incluido": "Todo Incluido (59€/mes)",
};

export default async function AdminHome() {
  const sites = await prisma.site.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { leads: true } } },
  });
  const base = process.env.BASE_DOMAIN ?? "localhost";

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sitios</h1>
        <Link
          href="/admin/sites/new"
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          + Nuevo sitio
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
        {sites.length === 0 && (
          <p className="p-6 text-sm text-slate-500">Aún no hay sitios. Crea el primero.</p>
        )}
        {sites.map((s) => (
          <Link
            key={s.id}
            href={`/admin/sites/${s.id}`}
            className="flex flex-wrap items-center gap-x-6 gap-y-1 border-b px-5 py-4 last:border-0 hover:bg-slate-50"
          >
            <div className="min-w-48">
              <p className="font-semibold">{s.name}</p>
              <p className="text-xs text-slate-500">
                {s.slug}.{base}
                {s.domain ? ` · ${s.domain}` : ""}
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
              {PLAN_LABEL[s.plan] ?? s.plan}
            </span>
            {s.aiEnabled && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">
                IA {s.aiUsed}/{s.aiQuota}
              </span>
            )}
            <span
              className={`ml-auto rounded-full px-3 py-1 text-xs ${
                s.published ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
              }`}
            >
              {s.published ? "Publicado" : "Borrador"}
            </span>
            <span className="text-xs text-slate-500">{s._count.leads} leads</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
