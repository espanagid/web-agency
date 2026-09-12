import { LeadForm } from "./LeadForm";

type Props = {
  section: { id: string; type: string; content: unknown };
  site: {
    name: string;
    whatsapp?: string | null;
    email?: string | null;
    address?: string | null;
    hours?: string | null;
  };
};

function WhatsAppButton({ whatsapp, label }: { whatsapp?: string | null; label: string }) {
  if (!whatsapp) return null;
  return (
    <a
      href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Hola, quiero reservar cita")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 font-semibold text-white shadow hover:opacity-90"
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.2-.7l.5-.6c.1-.2.2-.3.3-.5v-.5L9.7 7.4c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.2Z" />
      </svg>
      {label}
    </a>
  );
}

export function SectionRenderer({ section, site }: Props) {
  const c = (section.content ?? {}) as Record<string, any>;

  switch (section.type) {
    case "hero":
      return (
        <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-24 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {c.title ?? site.name}
          </h1>
          {c.subtitle && (
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">{c.subtitle}</p>
          )}
          <div className="mt-8 flex justify-center">
            <WhatsAppButton whatsapp={site.whatsapp} label={c.cta ?? "Reservar cita"} />
          </div>
        </section>
      );

    case "services":
      return (
        <section className="px-6 py-16">
          <h2 className="text-center text-2xl font-bold">{c.title ?? "Servicios"}</h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {(c.items ?? []).map((s: any, i: number) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="font-semibold">{s.name}</h3>
                  {s.price && (
                    <span className="shrink-0 font-bold text-[var(--color-primary)]">
                      {s.price}
                    </span>
                  )}
                </div>
                {s.desc && <p className="mt-2 text-sm text-slate-600">{s.desc}</p>}
              </div>
            ))}
          </div>
        </section>
      );

    case "testimonials":
      return (
        <section className="bg-slate-50 px-6 py-16">
          <h2 className="text-center text-2xl font-bold">{c.title ?? "Opiniones"}</h2>
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            {(c.items ?? []).map((t: any, i: number) => (
              <blockquote
                key={i}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <p className="text-slate-700">“{t.text}”</p>
                <footer className="mt-3 text-sm font-semibold text-[var(--color-primary)]">
                  — {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      );

    case "faq":
      return (
        <section className="px-6 py-16">
          <h2 className="text-center text-2xl font-bold">{c.title ?? "Preguntas frecuentes"}</h2>
          <div className="mx-auto mt-10 max-w-2xl space-y-3">
            {(c.items ?? []).map((f: any, i: number) => (
              <details key={i} className="rounded-xl border border-slate-200 p-4">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      );

    case "contact":
      return (
        <section id="contacto" className="bg-slate-50 px-6 py-16">
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-2xl font-bold">{c.title ?? "Contacto"}</h2>
            {c.note && <p className="mt-2 text-center text-slate-600">{c.note}</p>}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <LeadForm />
            </div>
            <div className="mt-6 flex flex-col items-center gap-3 text-center text-sm text-slate-600">
              <WhatsAppButton whatsapp={site.whatsapp} label="WhatsApp directo" />
              {site.email && <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>}
              {site.address && <p>{site.address}</p>}
              {site.hours && <p>{site.hours}</p>}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}
