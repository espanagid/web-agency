import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/SplitText";
import { useLang } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * Демо AI-ресепшиониста: pinned-секция, диалог разворачивается по мере скролла,
 * в конце — карточка «lead cualificado». Правая колонка подсвечивается синхронно.
 */
export default function AiDemo() {
  const { t } = useLang();
  const SCRIPT = t.demo.script;
  const FEATURES = t.demo.features;

  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const msgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const typingRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);
  const featRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const msgs = msgRefs.current.filter(Boolean) as HTMLDivElement[];
      const feats = featRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(msgs, { opacity: 0, y: 26, scale: 0.96, transformOrigin: "bottom left" });
      gsap.set(typingRef.current, { opacity: 0 });
      gsap.set(leadRef.current, { opacity: 0, y: 30, scale: 0.9 });
      gsap.set(feats, { opacity: 0.28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // лёгкий наклон телефона в начале
      tl.fromTo(
        phoneRef.current,
        { rotate: -2, y: 40 },
        { rotate: 0, y: 0, duration: 0.5, ease: "power2.out" }
      );

      msgs.forEach((m, i) => {
        const isIa = SCRIPT[i].from === "ia";
        if (isIa) {
          tl.to(typingRef.current, { opacity: 1, duration: 0.12 }, `m${i}`);
          tl.to(typingRef.current, { opacity: 0, duration: 0.12 }, `m${i}+=0.28`);
        }
        tl.to(m, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }, `m${i}+=0.3`);
        // подсветка соответствующей фичи
        const featIdx = Math.min(i, feats.length - 1);
        tl.to(feats[featIdx], { opacity: 1, x: 12, duration: 0.3 }, `m${i}+=0.3`);
      });

      // карточка «lead cualificado»
      tl.to(
        leadRef.current,
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.6)" },
        "+=0.4"
      );
      tl.to({}, { duration: 0.5 }); // пауза в конце
    }, sectionRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} id="ia" className="relative overflow-hidden bg-ink px-5 py-24 sm:px-8">
      {/* фоновое свечение */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, rgba(210,255,0,.4) 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2">
        {/* телефон */}
        <div ref={phoneRef} className="justify-self-center">
          <div className="w-[320px] rounded-[2.5rem] border border-cream/15 bg-[#101208] p-3 shadow-2xl sm:w-[360px]">
            <div className="rounded-[2rem] bg-[#15170e] px-4 pb-5 pt-4">
              {/* шапка чата */}
              <div className="mb-4 flex items-center gap-3 border-b border-cream/10 pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive font-display text-sm text-lime">
                  DS
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-cream">{t.demo.clinic}</div>
                  <div className="flex items-center gap-1.5 text-[0.65rem] text-sage">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    {t.demo.role}
                  </div>
                </div>
                <div className="tnum text-[0.65rem] text-sage">23:41</div>
              </div>

              {/* сообщения */}
              <div className="flex min-h-[320px] flex-col gap-2.5">
                {SCRIPT.map((m, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      msgRefs.current[i] = el;
                    }}
                    className={`bubble ${m.from === "ia" ? "bubble-out" : "bubble-in"}`}
                  >
                    {m.text}
                  </div>
                ))}
                <div ref={typingRef} className="bubble bubble-out flex items-center gap-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </div>
          </div>

          {/* уведомление владельцу */}
          <div
            ref={leadRef}
            className="mx-auto -mt-10 w-[300px] rounded-2xl border border-lime/40 bg-olive-deep p-4 shadow-glow-lime sm:w-[330px]"
          >
            <div className="flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-lime">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4L6 0z" fill="currentColor" />
              </svg>
              {t.demo.leadLabel}
            </div>
            <div className="mt-2 text-sm font-semibold text-cream">{t.demo.leadTitle}</div>
            <div className="mt-1 text-xs leading-relaxed text-sage">{t.demo.leadBody}</div>
          </div>
        </div>

        {/* текст и фичи */}
        <div>
          <SplitText as="p" className="eyebrow mb-6">
            {t.demo.eyebrow}
          </SplitText>
          <SplitText as="h2" className="display-section text-cream">
            {t.demo.titleA} <span className="display-accent">{t.demo.titleB}</span>
          </SplitText>

          <div className="mt-12 space-y-8">
            {FEATURES.map((f, i) => (
              <div
                key={f.t}
                ref={(el) => {
                  featRefs.current[i] = el;
                }}
                className="border-l border-lime/50 pl-6"
              >
                <h3 className="font-display text-xl text-cream sm:text-2xl">{f.t}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-sage">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
