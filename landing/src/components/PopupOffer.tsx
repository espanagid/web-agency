import { useEffect, useState } from "react";
import { scrollToId } from "../lib/scroll";
import { useLang } from "../i18n";

const DELAY_MS = 40_000; // 40 секунд на сайте
const SESSION_KEY = "webalo_popup_shown";

/**
 * Ненавязчивое предложение демо: появляется один раз за сессию
 * через 40 секунд нахождения на сайте.
 */
export default function PopupOffer({ ready }: { ready: boolean }) {
  const { t } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!ready) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      /* приватный режим */
    }
    const timer = window.setTimeout(() => {
      setShow(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* ignore */
      }
    }, DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [ready]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-24 z-40 animate-[bubbleIn_.5s_cubic-bezier(.2,.9,.3,1.2)_both] sm:inset-x-auto sm:left-6 sm:max-w-sm">
      <div className="rounded-3xl border border-lime/30 bg-ink/95 p-6 shadow-glow-lime backdrop-blur-sm">
        <button
          onClick={() => setShow(false)}
          aria-label={t.popup.dismiss}
          className="absolute right-4 top-4 text-sage transition-colors hover:text-cream"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        <p className="font-display text-xl leading-snug text-cream">{t.popup.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-sage">{t.popup.text}</p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setShow(false);
              scrollToId("#demo");
            }}
            className="rounded-full bg-lime px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition-transform duration-300 hover:scale-105"
          >
            {t.popup.cta}
          </button>
          <button
            onClick={() => setShow(false)}
            className="text-xs text-sage underline-offset-4 transition-colors hover:text-cream hover:underline"
          >
            {t.popup.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
