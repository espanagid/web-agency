import { useCallback, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initLenis } from "../lib/scroll";
import { LangProvider, useLang } from "../i18n";
import Preloader from "../sections/Preloader";
import Header from "../sections/Header";
import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import Pain from "../sections/Pain";
import AiDemo from "../sections/AiDemo";
import Process from "../sections/Process";
import DemoOffer from "../sections/DemoOffer";
import Cases from "../sections/Cases";
import Pricing from "../sections/Pricing";
import Compare from "../sections/Compare";
import Faq from "../sections/Faq";
import Footer from "../sections/Footer";

gsap.registerPlugin(ScrollTrigger);

function Page() {
  const { lang } = useLang();
  const [loaded, setLoaded] = useState(false);

  // Lenis + GSAP ticker — единый цикл анимации
  useEffect(() => {
    const lenis = initLenis();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, []);

  // пока идёт прелоадер — блокируем скролл
  useEffect(() => {
    const lenis = initLenis();
    if (loaded) {
      lenis.start();
      ScrollTrigger.refresh();
    } else {
      lenis.stop();
    }
  }, [loaded]);

  // после смены языка контент перемонтирован — пересчитываем триггеры
  useEffect(() => {
    if (loaded) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [lang, loaded]);

  const handleDone = useCallback(() => setLoaded(true), []);

  return (
    <div className="relative">
      {!loaded && <Preloader onDone={handleDone} />}
      <div className="noise-overlay" aria-hidden="true" />
      <Header />
      {/* key={lang}: смена языка перемонтирует секции и переигрывает анимации */}
      <main key={lang}>
        <Hero instant={loaded} />
        <Marquee />
        <Pain />
        <AiDemo />
        <Process />
        <DemoOffer />
        <Cases />
        <Pricing />
        <Compare />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
