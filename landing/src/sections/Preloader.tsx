import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/** Прелоадер: счётчик 0→100, затем уход вверх через clip-path. */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [num, setNum] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1,
          ease: "power4.inOut",
          onComplete: onDone,
        });
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => setNum(Math.round(counter.v)),
    });
  }, [onDone]);

  return (
    <div ref={rootRef} className="preloader" style={{ clipPath: "inset(0 0 0% 0)" }}>
      <div className="font-display italic text-cream text-2xl">
        webs<span className="text-lime not-italic">·</span>con
        <span className="text-lime not-italic">·</span>ia
      </div>
      <div className="tnum font-display text-lime text-[clamp(4rem,10vw,9rem)] leading-none">
        {num}
      </div>
    </div>
  );
}
