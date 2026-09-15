import { useState } from "react";
import IntakeChat from "./IntakeChat";
import { useLang } from "../i18n";

/**
 * Плавающая кнопка чата в правом нижнем углу.
 * Открывает панель с ИИ-агентом: первый вопрос — «демо или вопрос?».
 */
export default function ChatFloat() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* панель чата */}
      <div
        className={`fixed inset-x-3 bottom-24 z-50 transition-all duration-500 sm:inset-x-auto sm:right-6 sm:w-[420px] ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
        role="dialog"
        aria-label={t.intake.aiName}
      >
        <div className="max-h-[70vh] overflow-y-auto rounded-[2rem]" data-lenis-prevent>
          {open && <IntakeChat float />}
        </div>
      </div>

      {/* кнопка */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar chat" : t.intake.aiName}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lime text-ink shadow-glow-lime transition-transform duration-300 hover:scale-110"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              d="M21 12a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-ink bg-lime" />
          </span>
        )}
      </button>
    </>
  );
}
