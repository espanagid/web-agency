import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";
import { scrollToId } from "../lib/scroll";
import { useLang } from "../i18n";

gsap.registerPlugin(ScrollTrigger);

type ChatMsg = { from: "cliente" | "ia"; text: string };

/** Мини-чат в hero: зацикленный диалог с эффектом печати. */
function HeroChatCard({
  messages,
  role,
  online,
}: {
  messages: ChatMsg[];
  role: string;
  online: string;
}) {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const run = () => {
      setVisible(0);
      messages.forEach((_, i) => {
        timers.push(
          setTimeout(() => {
            if (cancelled) return;
            setTyping(true);
            timers.push(
              setTimeout(() => {
                if (cancelled) return;
                setTyping(false);
                setVisible(i + 1);
              }, 700)
            );
          }, i * 2200 + 800)
        );
      });
      timers.push(setTimeout(run, messages.length * 2200 + 4000));
    };
    const start = setTimeout(run, 3000);
    return () => {
      cancelled = true;
      clearTimeout(start);
      timers.forEach(clearTimeout);
    };
  }, [messages]);

  return (
    <div className="w-[300px] rounded-3xl border border-cream/10 bg-[#16170f]/90 p-4 shadow-2xl backdrop-blur-sm sm:w-[340px]">
      <div className="mb-3 flex items-center gap-2.5 border-b border-cream/10 pb-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime font-display text-sm font-bold text-ink">
          IA
        </div>
        <div>
          <div className="text-xs font-semibold text-cream">{role}</div>
          <div className="flex items-center gap-1.5 text-[0.65rem] text-sage">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-lime"
              style={{ animation: "pulse-glow 2s infinite" }}
            />
            {online}
          </div>
        </div>
        <div className="ml-auto text-[0.6rem] uppercase tracking-widest text-sage">02:47</div>
      </div>
      <div className="flex min-h-[180px] flex-col gap-2">
        {messages.slice(0, visible).map((m, i) => (
          <div
            key={i}
            className={`bubble ${m.from === "ia" ? "bubble-out" : "bubble-in"}`}
            style={{ animation: "bubbleIn .45s cubic-bezier(.2,.9,.3,1.2) both" }}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="bubble bubble-out flex items-center gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        )}
      </div>
      <style>{`@keyframes bubbleIn { from { opacity: 0; transform: translateY(10px) scale(.96); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

export default function Hero({ instant = false }: { instant?: boolean }) {
  const { t } = useLang();
  const D = instant ? 0.1 : 2.4; // после прелоадера — без длинных задержек
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // параллакс чат-карточки при скролле
      gsap.to(cardRef.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      // лёгкий дрейф свечения
      gsap.to(glowRef.current, {
        xPercent: 12,
        yPercent: -10,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
      });
      // появление карточки после прелоадера
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0, rotate: 6 },
        { y: 0, opacity: 1, rotate: 3, duration: 1.4, delay: D + 0.3, ease: "power4.out" }
      );
      gsap.fromTo(
        ".hero-stat",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: D + 0.6, stagger: 0.12, ease: "power3.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink px-5 pb-16 pt-32 sm:px-8"
    >
      {/* свечение и сетка */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -right-40 -top-40 h-[60vh] w-[60vh] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, rgba(210,255,0,.35) 0%, transparent 65%)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,244,237,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(244,244,237,.6) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <SplitText as="p" trigger="load" delay={D} className="eyebrow mb-8">
            {t.hero.eyebrow}
          </SplitText>

          <h1 className="display-hero text-cream">
            <SplitText as="span" trigger="load" delay={D + 0.1} className="block">
              {t.hero.titleA}
            </SplitText>
            <SplitText as="span" trigger="load" delay={D + 0.35} className="display-accent block">
              {t.hero.titleB}
            </SplitText>
          </h1>

          <SplitText
            as="p"
            trigger="load"
            delay={D + 0.5}
            className="mt-8 max-w-xl text-base leading-relaxed text-sage sm:text-lg"
          >
            {t.hero.sub}
          </SplitText>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton
              onClick={() => scrollToId("#demo")}
              href="#demo"
              external={false}
            >
              {t.hero.cta1}
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => scrollToId("#tarifas")}
              href="#tarifas"
              external={false}
            >
              {t.hero.cta2}
            </MagneticButton>
          </div>

          <div className="mt-14 flex flex-wrap gap-10 border-t border-cream/10 pt-8">
            {t.hero.stats.map((s) => (
              <div key={s.l} className="hero-stat opacity-0">
                <div className="font-display text-4xl text-lime sm:text-5xl">
                  <span className="tnum">{s.v}</span>
                  {s.u && <span className="text-2xl text-cream/70"> {s.u}</span>}
                </div>
                <div className="mt-1 max-w-[150px] text-xs leading-snug text-sage">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* парящая чат-карточка */}
        <div ref={cardRef} className="justify-self-center opacity-0 lg:justify-self-end">
          <HeroChatCard messages={t.hero.chat} role={t.hero.chatRole} online={t.hero.online} />
          <div className="mt-4 text-center text-[0.65rem] uppercase tracking-[0.28em] text-sage">
            {t.hero.chatCaption}
          </div>
        </div>
      </div>
    </section>
  );
}
