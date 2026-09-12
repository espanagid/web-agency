import { useRef, type ReactNode, type MouseEvent } from "react";
import gsap from "gsap";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "lime" | "ghost";
  className?: string;
  external?: boolean;
};

/** Магнитная кнопка: тянется к курсору, иконка-стрелка сдвигается на hover. */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "lime",
  className = "",
  external = true,
}: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);

  const handleMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * 0.25, y: y * 0.35, duration: 0.6, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  };

  const base =
    "group inline-flex items-center gap-3 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 will-change-transform";
  const styles =
    variant === "lime"
      ? "bg-lime text-ink hover:shadow-glow-lime"
      : "border border-cream/25 text-cream hover:border-lime hover:text-lime";

  const inner = (
    <>
      <span>{children}</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        <path
          d="M2 14L14 2M14 2H5M14 2V11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`${base} ${styles} ${className}`}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`${base} ${styles} ${className}`}
    >
      {inner}
    </button>
  );
}
