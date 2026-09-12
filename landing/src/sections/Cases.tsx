import SplitText, { FadeIn } from "../components/SplitText";
import { useLang } from "../i18n";

/**
 * Кейсы «Было → Стало» по нишам.
 * Макеты сайтов нарисованы кодом (CSS): слева — типичный «мёртвый» сайт,
 * справа — демо с ИИ. Ниже — метрики до/после.
 */

function BrowserChrome({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div className={`overflow-hidden rounded-xl border ${dark ? "border-lime/30" : "border-cream/15"}`}>
      {/* строка браузера */}
      <div className={`flex items-center gap-1.5 px-3 py-2 ${dark ? "bg-olive-deep" : "bg-[#d6d6d0]"}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]" />
        <span
          className={`ml-2 h-2.5 flex-1 rounded-full ${dark ? "bg-ink/70" : "bg-white/80"}`}
        />
      </div>
      <div className={`relative h-28 sm:h-32 ${dark ? "bg-ink" : "bg-[#ecece6]"}`}>{children}</div>
    </div>
  );
}

/** «До»: серый шаблонный сайт-буклет */
function BeforeSite() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-3">
      <div className="h-2 w-2/5 rounded-sm bg-[#9a9a92]" />
      <div className="h-1.5 w-3/5 rounded-sm bg-[#c2c2ba]" />
      <div className="h-1.5 w-1/2 rounded-sm bg-[#c2c2ba]" />
      <div className="mt-1 grid flex-1 grid-cols-3 gap-1.5">
        <div className="rounded-sm bg-[#d0d0c8]" />
        <div className="rounded-sm bg-[#d0d0c8]" />
        <div className="rounded-sm bg-[#d0d0c8]" />
      </div>
      <div className="h-1.5 w-1/4 rounded-sm bg-[#7a8ac0] underline" />
    </div>
  );
}

/** «После»: тёмный премиальный сайт с ИИ-чатом */
function AfterSite() {
  return (
    <div className="flex h-full flex-col gap-1.5 p-3">
      <div className="h-2.5 w-3/5 rounded-sm bg-cream" />
      <div className="h-2.5 w-2/5 rounded-sm bg-lime" />
      <div className="mt-1 flex gap-1.5">
        <div className="h-3 w-10 rounded-full bg-lime" />
        <div className="h-3 w-10 rounded-full border border-cream/30" />
      </div>
      {/* ИИ-виджет в углу */}
      <div className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink" />
        <span className="text-[0.5rem] font-bold uppercase tracking-wider text-ink">IA 24/7</span>
      </div>
    </div>
  );
}

export default function Cases() {
  const { t } = useLang();
  const c = t.cases;

  return (
    <section id="casos" className="relative overflow-hidden bg-olive-deep px-5 py-24 sm:px-8 sm:py-32">
      <div
        className="pointer-events-none absolute -right-52 top-16 h-[55vh] w-[55vh] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(210,255,0,.35) 0%, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-[1400px]">
        <SplitText as="p" className="eyebrow mb-6">
          {c.eyebrow}
        </SplitText>
        <SplitText as="h2" className="display-section max-w-4xl text-cream">
          {c.titleA} <span className="display-accent">{c.titleB}</span>
        </SplitText>
        <FadeIn delay={0.1}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-sage">{c.note}</p>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <FadeIn key={item.niche} delay={i * 0.1} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-cream/12 bg-ink/50 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-lime/35 sm:p-8">
                <h3 className="font-display text-2xl italic text-cream">{item.niche}</h3>

                {/* до / после */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div>
                    <div className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-sage">
                      {c.before}
                    </div>
                    <BrowserChrome>
                      <BeforeSite />
                    </BrowserChrome>
                  </div>
                  <div>
                    <div className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-lime">
                      {c.after}
                    </div>
                    <BrowserChrome dark>
                      <AfterSite />
                    </BrowserChrome>
                  </div>
                </div>

                {/* метрики */}
                <ul className="mt-7 flex-1 space-y-4 border-t border-cream/10 pt-6">
                  {item.metrics.map((m) => (
                    <li key={m.label} className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1">
                      <span className="text-xs leading-snug text-sage sm:text-sm">{m.label}</span>
                      <span className="tnum flex items-baseline gap-2 whitespace-nowrap">
                        <span className="text-sm text-cream/40 line-through decoration-cream/30">
                          {m.before}
                        </span>
                        <svg width="14" height="10" viewBox="0 0 14 10" className="translate-y-[1px] text-lime">
                          <path
                            d="M1 5h11M8 1l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-display text-xl italic text-lime">{m.after}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
