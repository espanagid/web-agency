import SplitText, { FadeIn } from "../components/SplitText";
import IntakeChat from "../components/IntakeChat";
import { WA_LINK_DEMO } from "../lib/site";
import { useLang } from "../i18n";

/**
 * Лид-магнит: бесплатное демо за 72 часа.
 * Центр секции — ИИ-чат, который сам собирает бриф (текст + файлы любого
 * формата) и передаёт заявку владельцу. Ниже — детали «что присылаете /
 * что получаете» и альтернатива через WhatsApp.
 */
export default function DemoOffer() {
  const { t } = useLang();
  const d = t.demoOffer;

  return (
    <section id="demo" className="relative overflow-hidden bg-ink px-5 py-24 sm:px-8 sm:py-32">
      {/* фоновое свечение */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[50vh] w-[50vh] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, rgba(210,255,0,.3) 0%, transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="rounded-[2.5rem] border border-lime/35 bg-olive-deep/60 p-6 backdrop-blur-sm sm:p-14">
          <div className="flex flex-wrap items-center gap-4">
            <SplitText as="p" className="eyebrow">
              {d.eyebrow}
            </SplitText>
            <FadeIn delay={0.1}>
              <span className="rounded-full bg-lime px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink">
                {d.badge}
              </span>
            </FadeIn>
          </div>

          <SplitText as="h2" className="display-section mt-6 max-w-4xl text-cream">
            {d.titleA} <span className="display-accent">{d.titleB}</span>
          </SplitText>
          <SplitText as="p" className="mt-6 max-w-2xl text-base leading-relaxed text-sage sm:text-lg">
            {d.sub}
          </SplitText>

          {/* ИИ-интейк: главный элемент секции */}
          <FadeIn delay={0.15} className="mt-12">
            <div className="mx-auto max-w-3xl">
              <IntakeChat />
              <p className="mt-5 text-center text-xs uppercase tracking-[0.22em] text-sage">
                {d.note}
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {/* что присылает клиент */}
            <FadeIn delay={0.1} className="h-full">
              <div className="h-full rounded-3xl border border-cream/12 bg-ink/60 p-8">
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-sage">
                  {d.sendTitle}
                </div>
                <ul className="mt-6 space-y-4">
                  {d.send.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm text-cream/90 sm:text-base">
                      <span className="tnum mt-0.5 font-display text-sm italic text-lime">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            {/* что получает */}
            <FadeIn delay={0.2} className="h-full">
              <div className="flex h-full flex-col rounded-3xl bg-lime p-8 text-ink">
                <div className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-ink/60">
                  {d.getTitle}
                </div>
                <ul className="mt-6 flex-1 space-y-4">
                  {d.get.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-medium sm:text-base">
                      <svg width="16" height="16" viewBox="0 0 14 14" className="mt-1 shrink-0">
                        <path
                          d="M2 7.5L5.5 11L12 3.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-ink/15 pt-6 font-display text-lg italic leading-snug">
                  {d.then}
                </p>
              </div>
            </FadeIn>
          </div>

          {/* альтернатива: напрямую в WhatsApp */}
          <FadeIn delay={0.25} className="mt-10 text-center">
            <a
              href={WA_LINK_DEMO}
              target="_blank"
              rel="noreferrer"
              className="u-link text-sm font-medium text-cream/80"
            >
              {d.cta} → WhatsApp
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
