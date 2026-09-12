import { useEffect, useRef } from "react";
import gsap from "gsap";
import { getScrollVelocity } from "../lib/scroll";
import { useLang } from "../i18n";

/**
 * Бегущая строка ниш. Скорость и skew зависят от velocity Lenis-скролла.
 */
export default function Marquee() {
  const { t } = useLang();
  const ITEMS = t.marquee;
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const half = track.scrollWidth / 2;
    let raf: number;

    const tick = () => {
      const v = getScrollVelocity();
      const speed = 1.2 + Math.min(Math.abs(v) * 0.35, 8);
      xRef.current -= speed;
      if (-xRef.current >= half) xRef.current += half;
      const skew = gsap.utils.clamp(-8, 8, v * 0.5);
      gsap.set(track, { x: xRef.current, skewX: skew });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const row = [...ITEMS, ...ITEMS];

  return (
    <section className="overflow-hidden border-y border-cream/10 bg-olive-deep py-6">
      <div ref={trackRef} className="marquee-track items-center gap-10">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center gap-10">
                <span className="whitespace-nowrap font-display text-3xl text-cream/85 sm:text-4xl">
                  {item}
                </span>
                <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0 text-lime">
                  <path
                    d="M9 0l2.1 6.9L18 9l-6.9 2.1L9 18l-2.1-6.9L0 9l6.9-2.1L9 0z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
