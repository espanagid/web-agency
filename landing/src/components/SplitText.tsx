import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  /** задержка старта, сек */
  delay?: number;
  /** 'load' — анимируется сразу, 'scroll' — по ScrollTrigger */
  trigger?: "load" | "scroll";
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/** Плоский список токенов: строки → слова, элементы → как есть. */
function tokenize(node: ReactNode, acc: (string | ReactNode)[]) {
  if (typeof node === "string") {
    node
      .split(/\s+/)
      .filter(Boolean)
      .forEach((w) => acc.push(w));
  } else if (Array.isArray(node)) {
    node.forEach((n) => tokenize(n, acc));
  } else if (node != null && typeof node !== "boolean") {
    acc.push(node);
  }
}

/**
 * Каждое слово — в overflow-hidden маске.
 * Появление: translateY(120%) + лёгкий rotate → 0 с каскадом.
 */
export default function SplitText({
  children,
  className = "",
  delay = 0,
  trigger = "scroll",
  as: Tag = "h2",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const tokens: (string | ReactNode)[] = [];
  tokenize(children, tokens);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const inners = root.querySelectorAll<HTMLElement>(".st-inner");

    const ctx = gsap.context(() => {
      gsap.set(inners, { yPercent: 120, rotate: 4 });
      const play = () =>
        gsap.to(inners, {
          yPercent: 0,
          rotate: 0,
          duration: 1.2,
          delay,
          ease: "power4.out",
          stagger: 0.045,
        });

      if (trigger === "load") {
        play();
      } else {
        ScrollTrigger.create({
          trigger: root,
          start: "top 85%",
          once: true,
          onEnter: play,
        });
      }
    }, root);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, trigger]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} aria-label={tokens.filter((t) => typeof t === "string").join(" ")}>
      {tokens.map((t, i) => (
        <span key={i} className="st-line" style={{ display: "inline-block", verticalAlign: "top" }}>
          <span className="st-inner">{t}</span>
          {i < tokens.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
