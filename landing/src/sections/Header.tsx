import { useEffect, useState } from "react";
import { WA_LINK } from "../lib/site";
import { scrollToId } from "../lib/scroll";
import { useLang, type Lang } from "../i18n";

const LANGS: Lang[] = ["es", "en", "ru"];

function LangSwitch({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border p-0.5 ${
        dark ? "border-cream/20 bg-ink/40" : "border-cream/20"
      }`}
    >
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
            lang === l ? "bg-lime text-ink" : "text-sage hover:text-cream"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const NAV = [
    { label: t.nav.ia, href: "#ia" },
    { label: t.nav.proceso, href: "#proceso" },
    { label: t.nav.demo, href: "#demo" },
    { label: t.nav.tarifas, href: "#tarifas" },
    { label: t.nav.faq, href: "#faq" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-cream/10 bg-ink/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => go("#top")}
            className="font-display text-xl italic text-cream"
            aria-label="Webs con IA — inicio"
          >
            webs<span className="not-italic text-lime">·</span>con
            <span className="not-italic text-lime">·</span>ia
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.href}
                onClick={() => go(n.href)}
                className="u-link text-[0.72rem] uppercase tracking-[0.22em] text-sage transition-colors hover:text-cream"
              >
                {n.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangSwitch />
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-lime px-5 py-2.5 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-ink transition-shadow hover:shadow-glow-lime sm:block"
            >
              {t.nav.whatsapp}
            </a>
            {/* бургер */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Menú"
            >
              <span
                className={`h-px w-6 bg-cream transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-px w-6 bg-cream transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* мобильное меню */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-8 px-8">
          {NAV.map((n, i) => (
            <button
              key={n.href}
              onClick={() => go(n.href)}
              className={`text-left font-display text-4xl text-cream transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: `${100 + i * 70}ms` }}
            >
              {n.label}
            </button>
          ))}
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit rounded-full bg-lime px-7 py-4 text-sm font-bold uppercase tracking-[0.14em] text-ink"
          >
            {t.nav.writeUs}
          </a>
        </div>
      </div>
    </>
  );
}
