import SplitText, { FadeIn } from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";
import { WA_LINK_PLAN } from "../lib/site";
import { useLang } from "../i18n";

export default function Pricing() {
  const { t } = useLang();

  return (
    <section id="tarifas" className="bg-olive px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SplitText as="p" className="eyebrow mb-6">
          {t.pricing.eyebrow}
        </SplitText>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitText as="h2" className="display-section max-w-3xl text-cream">
            {t.pricing.title}
          </SplitText>
          <FadeIn delay={0.2}>
            <p className="max-w-xs text-sm leading-relaxed text-sage">{t.pricing.note}</p>
          </FadeIn>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.pricing.plans.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1} className="h-full">
              <div
                className={`group relative flex h-full flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 sm:p-10 ${
                  p.highlight
                    ? "bg-lime text-ink shadow-glow-lime"
                    : "border border-cream/12 bg-olive-deep text-cream"
                }`}
              >
                {p.highlight && (
                  <div className="absolute -top-3.5 left-8 rounded-full bg-ink px-4 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-lime">
                    {t.pricing.recommended}
                  </div>
                )}
                <div
                  className={`text-[0.65rem] font-bold uppercase tracking-[0.28em] ${
                    p.highlight ? "text-ink/60" : "text-sage"
                  }`}
                >
                  {p.tag}
                </div>
                <h3 className="mt-3 font-display text-3xl">{p.name}</h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="tnum font-display text-5xl">{p.price}</span>
                  <span className={`text-sm ${p.highlight ? "text-ink/70" : "text-sage"}`}>{p.per}</span>
                </div>
                <div className={`mt-1 text-xs ${p.highlight ? "text-ink/60" : "text-sage/80"}`}>{p.note}</div>

                <ul className="mt-8 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-snug">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className={`mt-0.5 shrink-0 ${p.highlight ? "text-ink" : "text-lime"}`}
                      >
                        <path
                          d="M2 7.5L5.5 11L12 3.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className={p.highlight ? "text-ink/85" : "text-cream/85"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <MagneticButton
                    href={WA_LINK_PLAN(p.id)}
                    variant={p.highlight ? "ghost" : "lime"}
                    className={
                      p.highlight
                        ? "w-full justify-center !border-ink/30 !text-ink hover:!border-ink"
                        : "w-full justify-center"
                    }
                  >
                    {p.cta}
                  </MagneticButton>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.1} className="mt-10">
          <div className="mx-auto max-w-3xl rounded-2xl border border-lime/20 bg-olive-deep/60 px-6 py-5 text-center sm:px-8">
            <p className="text-sm leading-relaxed text-sage">
              {t.pricing.recon1}{" "}
              <a
                href={WA_LINK_PLAN("reconstrucción")}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link whitespace-nowrap text-lime"
              >
                {t.pricing.reconLink}
              </a>{" "}
              {t.pricing.recon2}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 text-center">
          <p className="text-sm text-sage">
            {t.pricing.bottom1}{" "}
            <a
              href={WA_LINK_PLAN("consulta")}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link text-lime"
            >
              {t.pricing.bottomLink}
            </a>
            {t.pricing.bottom2}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
