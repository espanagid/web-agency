import { getSite } from "@/lib/tenant";
import { SectionRenderer } from "@/components/SectionRenderer";
import { ChatWidget } from "@/components/ChatWidget";
import { AgencySite } from "@/components/AgencySite";

export const dynamic = "force-dynamic"; // siempre fresh: contenido cambia por admin

export default async function Home() {
  const site = await getSite();

  // Dominio principal sin registro "agencia" todavía
  if (!site) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          Agencia
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Webs que trabajan mientras duermes
        </h1>
        <p className="mt-4 max-w-xl text-slate-600">
          Landing pages y webs con recepcionista de IA que responde y agenda citas 24/7.
          Entrega en 72h.
        </p>
        <a
          href="/admin"
          className="mt-8 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white"
        >
          Admin
        </a>
      </main>
    );
  }

  // Web de la propia agencia (multilingüe, rich UI)
  if (site.slug === "agencia") {
    return (
      <main>
        <AgencySite site={site} />
        {site.aiEnabled && <ChatWidget siteName={site.name} whatsapp={site.whatsapp} />}
      </main>
    );
  }

  if (!site.published) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-3xl font-bold">{site.name}</h1>
          <p className="mt-3 text-slate-500">Sitio en construcción. Próximamente.</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      {site.sections.map((s) => (
        <SectionRenderer key={s.id} section={s} site={site} />
      ))}
      {site.aiEnabled && <ChatWidget siteName={site.name} whatsapp={site.whatsapp} />}
    </main>
  );
}
