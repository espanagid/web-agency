import { useEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import SplitText, { FadeIn } from "../components/SplitText";
import MagneticButton from "../components/MagneticButton";
import { WA_LINK, SITE } from "../lib/site";
import { getScrollVelocity } from "../lib/scroll";
import { useLang } from "../i18n";

/** Финальный CTA: гигантская бегущая строка + контакты. */
export default function Footer() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    let raf: number;
    const tick = () => {
      const v = getScrollVelocity();
      xRef.current -= 1.6 + Math.min(Math.abs(v) * 0.4, 10);
      if (-xRef.current >= half) xRef.current += half;
      gsap.set(track, { x: xRef.current });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-olive-deep pt-24">
      <div className="px-5 sm:px-8">
        <div className="mx-auto max-w-[1400px] text-center">
          <SplitText as="p" className="eyebrow mb-8">
            {t.footer.eyebrow}
          </SplitText>
          <SplitText as="h2" className="display-section mx-auto max-w-4xl text-cream">
            {t.footer.titleA} <span className="display-accent">{t.footer.titleB}</span>
          </SplitText>
          <FadeIn delay={0.15} className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={WA_LINK} className="!px-10 !py-5 !text-base">
              {t.footer.cta}
            </MagneticButton>
          </FadeIn>
          <FadeIn delay={0.25} className="mt-6">
            <p className="text-sm text-sage">{t.footer.note}</p>
          </FadeIn>
        </div>
      </div>

      {/* гигантская бегущая строка */}
      <div className="mt-20 overflow-hidden border-t border-cream/10 py-10">
        <div ref={trackRef} className="marquee-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap px-6 font-display text-[clamp(4rem,10vw,10rem)] leading-none text-cream/90"
                >
                  {t.footer.marquee}
                  <span className="italic text-lime">{t.footer.marqueeQ}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-cream/10 px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-xs text-sage sm:flex-row">
          <div className="font-display text-base italic text-cream">
            web<span className="not-italic text-lime">·</span>alo
          </div>
          <div className="flex items-center gap-6">
            <a href={`mailto:${SITE.email}`} className="u-link transition-colors hover:text-cream">
              {SITE.email}
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="u-link transition-colors hover:text-cream"
            >
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/aviso-legal" className="u-link transition-colors hover:text-cream">
              Aviso legal
            </Link>
            <Link to="/privacidad" className="u-link transition-colors hover:text-cream">
              Privacidad
            </Link>
            <Link to="/cookies" className="u-link transition-colors hover:text-cream">
              Cookies
            </Link>
          </div>
          <div>{t.footer.rights}</div>
        </div>
      </div>
    </footer>
  );
}
