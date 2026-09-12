import Lenis from "lenis";

/**
 * Глобальный синглтон smooth-scroll.
 * Создаётся один раз в Home, секции читают velocity для skew/marquee.
 */
let lenis: Lenis | null = null;
let velocity = 0;

export function initLenis(): Lenis {
  if (lenis) return lenis;
  lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
  });
  lenis.on("scroll", (e: { velocity: number }) => {
    velocity = e.velocity;
  });
  return lenis;
}

export function getLenis() {
  return lenis;
}

export function getScrollVelocity() {
  return velocity;
}

export function scrollToId(id: string) {
  const el = document.querySelector(id);
  if (!el || !lenis) return;
  lenis.scrollTo(el as HTMLElement, { offset: -20, duration: 1.6 });
}
