import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText, { FadeIn } from "../components/SplitText";
import { useLang } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

/** Процесс: вертикальная линия прогресса, шаги появляются при скролле. */
export default function Process() {
  const { t } = useLang();
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="proceso" className="bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SplitText as="p" className="eyebrow mb-6">
          {t.process.eyebrow}
        </SplitText>
        <SplitText as="h2" className="display-section max-w-4xl text-cream">
          {t.process.titleA} <span className="display-accent">{t.process.titleB}</span>
        </SplitText>

        <div className="process-steps relative mt-20 md:pl-24">
          {/* линия прогресса */}
          <div className="absolute left-0 top-0 hidden h-full w-px bg-cream/10 md:block" style={{ left: "2.35rem" }} />
          <div
            ref={lineRef}
            className="absolute top-0 hidden h-full w-px bg-lime md:block"
            style={{ left: "2.35rem" }}
          />

          <div className="space-y-16 md:space-y-24">
            {t.process.steps.map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.05}>
                <div className="relative grid gap-6 md:grid-cols-[auto_1fr_1.2fr] md:items-baseline md:gap-14">
                  {/* узел на линии */}
                  <div className="hidden md:absolute md:-left-[4.7rem] md:top-2 md:block">
                    <div className="flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full border border-cream/15 bg-ink font-display text-lg italic text-lime">
                      {s.n}
                    </div>
                  </div>
                  <div className="font-display text-lg italic text-lime md:hidden">{s.n}</div>
                  <div>
                    <div className="text-[0.65rem] uppercase tracking-[0.28em] text-lime">{s.time}</div>
                    <h3 className="mt-2 font-display text-3xl text-cream sm:text-4xl">{s.t}</h3>
                  </div>
                  <p className="max-w-lg text-sm leading-relaxed text-sage sm:text-base">{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
