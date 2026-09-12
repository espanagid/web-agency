import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLang, type Lang } from "../i18n";
import { trpc } from "@/providers/trpc";
import { SITE } from "../lib/site";

/**
 * ИИ-интейк: диалоговый сбор брифа на бесплатное демо.
 * Сценарный ассистент с адаптивными уточнениями:
 * имя → бизнес → ниша → описание (с дожимом, если мало) → цвета → лого →
 * файлы любого формата → контакт (авто-извлечение из текста) → доп. инфо →
 * сводка → отправка в CRM + кнопка дублирования в WhatsApp владельцу.
 */

type Step =
  | "name"
  | "business"
  | "sector"
  | "sectorFree"
  | "desc"
  | "desc2"
  | "colors"
  | "logo"
  | "files"
  | "contactAuto"
  | "contact"
  | "extra"
  | "summary"
  | "done";

interface Msg {
  id: number;
  from: "ai" | "user";
  text: string;
  kind?: "text" | "summary" | "success";
}

interface AttachedFile {
  filename: string;
  mime: string;
  dataBase64: string;
}

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.]{2,}/;
const PHONE_RE = /\+?\d[\d\s().-]{7,}\d/;

function extractContact(text: string): string | null {
  const email = text.match(EMAIL_RE);
  if (email) return email[0];
  const phone = text.match(PHONE_RE);
  if (phone && phone[0].replace(/\D/g, "").length >= 9) return phone[0].trim();
  return null;
}

function isValidContact(text: string): boolean {
  const c = extractContact(text);
  return c !== null && c.trim().length > 0;
}

const SUMMARY_LABELS: Record<Lang, Record<string, string>> = {
  es: {
    title: "NUEVO BRIEF — DEMO GRATIS",
    name: "Nombre",
    business: "Negocio",
    sector: "Sector",
    colors: "Colores",
    logo: "Logo",
    logoYes: "lo adjunta",
    logoGen: "generar uno",
    contact: "Contacto",
    info: "Info",
    files: "Archivos adjuntos en el panel",
  },
  en: {
    title: "NEW BRIEF — FREE DEMO",
    name: "Name",
    business: "Business",
    sector: "Sector",
    colors: "Colors",
    logo: "Logo",
    logoYes: "attached",
    logoGen: "generate one",
    contact: "Contact",
    info: "Info",
    files: "Files attached in the panel",
  },
  ru: {
    title: "НОВЫЙ БРИФ — БЕСПЛАТНОЕ ДЕМО",
    name: "Имя",
    business: "Бизнес",
    sector: "Ниша",
    colors: "Цвета",
    logo: "Логотип",
    logoYes: "приложен",
    logoGen: "сгенерировать",
    contact: "Контакт",
    info: "Инфо",
    files: "Файлы приложены в панели",
  },
};

let mid = 0;
const nextId = () => ++mid;

export default function IntakeChat() {
  const { t, lang } = useLang();
  const d = t.intake;
  const L = SUMMARY_LABELS[lang];

  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  // собранные данные
  const data = useRef({
    name: "",
    businessName: "",
    sector: "",
    notes: [] as string[],
    colors: "",
    hasLogo: "",
    contact: "",
    extracted: null as string | null,
  });
  const [files, setFiles] = useState<AttachedFile[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const startedRef = useRef(false);

  const submitMutation = trpc.leads.submit.useMutation();

  const pushAi = useCallback((text: string, kind: Msg["kind"] = "text") => {
    setTyping(true);
    const wait = Math.min(500 + text.length * 12, 1400);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId(), from: "ai", text, kind }]);
    }, wait);
  }, []);

  const pushUser = useCallback((text: string) => {
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
  }, []);

  // старт диалога
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    pushAi(d.greeting);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // автопрокрутка вниз
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  const buildSummary = useCallback((): string => {
    const v = data.current;
    const lines = [
      L.title,
      `${L.name}: ${v.name}`,
      `${L.business}: ${v.businessName}`,
      `${L.sector}: ${v.sector}`,
      `${L.colors}: ${v.colors}`,
      `${L.logo}: ${v.hasLogo === "yes" ? L.logoYes : L.logoGen}`,
      `${L.contact}: ${v.contact}`,
    ];
    const notes = v.notes.filter(Boolean);
    if (notes.length) lines.push(`${L.info}: ${notes.join(" | ")}`);
    if (files.length) lines.push(`${L.files}: ${files.length}`);
    return lines.join("\n");
  }, [L, files]);

  const summary = useMemo(
    () => (step === "summary" || step === "done" ? buildSummary() : ""),
    [step, buildSummary]
  );

  const goFiles = useCallback(() => {
    pushAi(d.askFiles);
    setStep("files");
  }, [d.askFiles, pushAi]);

  const goContact = useCallback(() => {
    if (data.current.extracted) {
      pushAi(d.contactAuto.replace("{c}", data.current.extracted));
      setStep("contactAuto");
    } else {
      pushAi(d.askContact);
      setStep("contact");
    }
  }, [d.askContact, d.contactAuto, pushAi]);

  const goExtra = useCallback(() => {
    pushAi(d.askExtra);
    setStep("extra");
  }, [d.askExtra, pushAi]);

  const goSummary = useCallback(() => {
    pushAi(d.summaryTitle, "summary");
    setStep("summary");
  }, [d.summaryTitle, pushAi]);

  /** Обработка текстового ответа пользователя по текущему шагу */
  const handleText = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;
      pushUser(text);
      setInput("");
      const v = data.current;

      switch (step) {
        case "name": {
          v.name = text;
          pushAi(d.askBusiness.replace("{name}", text));
          setStep("business");
          break;
        }
        case "business": {
          v.businessName = text;
          pushAi(d.askSector);
          setStep("sector");
          break;
        }
        case "sector": {
          v.sector = text;
          pushAi(d.askDesc);
          setStep("desc");
          break;
        }
        case "sectorFree": {
          v.sector = text;
          pushAi(d.askDesc);
          setStep("desc");
          break;
        }
        case "desc": {
          v.notes.push(text);
          const found = extractContact(text);
          if (found) v.extracted = found;
          if (text.length < 80) {
            pushAi(d.descFollowUp);
            setStep("desc2");
          } else {
            pushAi(d.descThanks);
            window.setTimeout(() => {
              pushAi(d.askColors);
              setStep("colors");
            }, 900);
          }
          break;
        }
        case "desc2": {
          v.notes.push(text);
          const found = extractContact(text);
          if (found) v.extracted = found;
          pushAi(d.descThanks);
          window.setTimeout(() => {
            pushAi(d.askColors);
            setStep("colors");
          }, 900);
          break;
        }
        case "colors": {
          v.colors = text;
          pushAi(d.askLogo);
          setStep("logo");
          break;
        }
        case "logo": {
          v.hasLogo = "yes";
          pushAi(d.askFiles);
          setStep("files");
          break;
        }
        case "contact": {
          if (!isValidContact(text)) {
            pushAi(d.contactInvalid);
            break;
          }
          v.contact = extractContact(text) ?? text;
          goExtra();
          break;
        }
        case "extra": {
          v.notes.push(text);
          goSummary();
          break;
        }
        default:
          break;
      }
    },
    [d, goExtra, goSummary, pushAi, pushUser, step]
  );

  /** Клик по чипу */
  const handleChip = useCallback(
    (chip: string) => {
      const v = data.current;
      pushUser(chip);

      if (step === "sector") {
        if (chip === d.sectorOther) {
          pushAi(d.askSectorFree);
          setStep("sectorFree");
        } else {
          v.sector = chip;
          pushAi(d.askDesc);
          setStep("desc");
        }
        return;
      }
      if (step === "colors") {
        v.colors = chip;
        pushAi(d.askLogo);
        setStep("logo");
        return;
      }
      if (step === "logo") {
        v.hasLogo = chip === d.logoHave ? "yes" : "generate";
        goFiles();
        return;
      }
      if (step === "files") {
        if (chip === d.ready || chip === d.skip) goContact();
        return;
      }
      if (step === "contactAuto") {
        if (chip === d.contactUseIt) {
          v.contact = v.extracted ?? "";
          goExtra();
        } else {
          pushAi(d.askContact);
          setStep("contact");
        }
        return;
      }
      if (step === "extra") {
        goSummary();
        return;
      }
    },
    [d, goContact, goExtra, goFiles, goSummary, pushAi, pushUser, step]
  );

  /** Прикрепление файлов — любой формат, до 6 шт */
  const handleFiles = useCallback(
    (list: FileList | null) => {
      if (!list) return;
      setFileError(null);
      const arr = Array.from(list);
      const room = 6 - files.length;
      if (room <= 0) {
        setFileError(d.filesMax);
        return;
      }
      arr.slice(0, room).forEach((f) => {
        if (f.size > 9 * 1024 * 1024) {
          setFileError(d.filesMax);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const url = String(reader.result ?? "");
          const base64 = url.includes(",") ? url.split(",")[1] : url;
          setFiles((prev) => {
            if (prev.length >= 6) return prev;
            return [
              ...prev,
              { filename: f.name, mime: f.type || "application/octet-stream", dataBase64: base64 },
            ];
          });
          pushAi(d.fileAdded.replace("{name}", f.name));
        };
        reader.readAsDataURL(f);
      });
      if (arr.length > room) setFileError(d.filesMax);
      if (fileRef.current) fileRef.current.value = "";
    },
    [d.fileAdded, d.filesMax, files.length, pushAi]
  );

  /** Отправка брифа */
  const handleSubmit = useCallback(async () => {
    if (sending) return;
    setSending(true);
    const v = data.current;
    const transcript = messages
      .filter((m) => m.kind === "text" || !m.kind)
      .map((m) => `${m.from === "ai" ? "AI" : "USER"}: ${m.text}`)
      .join("\n");
    try {
      await submitMutation.mutateAsync({
        lang,
        name: v.name || undefined,
        contact: v.contact || undefined,
        businessName: v.businessName || undefined,
        sector: v.sector || undefined,
        colors: v.colors || undefined,
        hasLogo: v.hasLogo || undefined,
        notes: v.notes.filter(Boolean).join("\n---\n") || undefined,
        transcript: transcript || undefined,
        summary,
        files,
      });
      pushAi(`${d.successTitle}\n${d.successText}`, "success");
      setStep("done");
    } catch {
      pushAi("⚠️ Error — inténtalo de nuevo / try again.");
    } finally {
      setSending(false);
    }
  }, [d, files, lang, messages, pushAi, sending, submitMutation, summary]);

  // какие чипы показывать
  const chips: string[] =
    step === "sector"
      ? d.sectors
      : step === "colors"
        ? d.colorChips
        : step === "logo"
          ? [d.logoHave, d.logoGenerate]
          : step === "files"
            ? [d.ready, d.skip]
            : step === "contactAuto"
              ? [d.contactUseIt, d.contactOther]
              : step === "extra"
                ? [d.extraDone]
                : [];

  const inputEnabled = ["name", "business", "sector", "sectorFree", "desc", "desc2", "colors", "contact"].includes(step);

  return (
    <div className="overflow-hidden rounded-[2rem] border border-lime/25 bg-ink/80 shadow-glow-lime backdrop-blur-sm">
      {/* шапка чата */}
      <div className="flex items-center gap-3 border-b border-cream/10 bg-olive-deep/70 px-6 py-4">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-lime" />
        </span>
        <div>
          <div className="text-sm font-semibold text-cream">{d.aiName}</div>
          <div className="text-[0.65rem] uppercase tracking-[0.22em] text-sage">{t.hero.online}</div>
        </div>
      </div>

      {/* сообщения */}
      <div
        ref={scrollRef}
        data-lenis-prevent
        className="h-[380px] space-y-3 overflow-y-auto px-5 py-6 sm:h-[420px] sm:px-8"
      >
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            {m.kind === "summary" ? (
              <div className="w-full max-w-xl rounded-2xl rounded-tl-sm border border-lime/30 bg-olive-deep/80 p-5">
                <div className="text-sm font-semibold text-lime">{m.text}</div>
                {step === "summary" && (
                  <>
                    <pre className="tnum mt-4 whitespace-pre-wrap rounded-xl bg-ink/70 p-4 text-xs leading-relaxed text-cream/85">
                      {summary}
                    </pre>
                    <button
                      onClick={handleSubmit}
                      disabled={sending}
                      className="mt-4 w-full rounded-full bg-lime px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60"
                    >
                      {sending ? d.sending : d.submit}
                    </button>
                  </>
                )}
              </div>
            ) : m.kind === "success" ? (
              <div className="w-full max-w-xl rounded-2xl rounded-tl-sm border border-lime/30 bg-olive-deep/80 p-5">
                <div className="whitespace-pre-line text-sm leading-relaxed text-cream">{m.text}</div>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(summary)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-ink transition-transform duration-300 hover:scale-[1.03]"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.9 2.1c.1.2.1.4 0 .6l-.4.6-.5.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.8 1.7.3.2.5.1.7-.1l1-1.2c.2-.3.4-.2.7-.1l2.1 1c.3.2.5.3.6.4 0 .1 0 .7-.2 1.2Z" />
                  </svg>
                  {d.waButton}
                </a>
              </div>
            ) : (
              <div
                className={`max-w-[85%] whitespace-pre-line rounded-2xl px-5 py-3.5 text-sm leading-relaxed sm:max-w-[75%] ${
                  m.from === "user"
                    ? "rounded-tr-sm bg-lime font-medium text-ink"
                    : "rounded-tl-sm bg-olive-deep/80 text-cream/90"
                }`}
              >
                {m.text}
              </div>
            )}
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-olive-deep/80 px-5 py-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-sage"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* чипы */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-cream/10 px-5 pt-4 sm:px-8">
          {chips.map((c) => (
            <button
              key={c}
              onClick={() => handleChip(c)}
              className="rounded-full border border-cream/20 px-4 py-2 text-xs font-medium text-cream/85 transition-all duration-300 hover:border-lime hover:text-lime"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* файловая панель */}
      {step === "files" && (
        <div className="px-5 pt-3 sm:px-8">
          <button
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-full bg-cream/10 px-5 py-2.5 text-xs font-semibold text-cream transition-colors hover:bg-cream/15"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {d.attach} · {files.length}/6
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {fileError && <p className="mt-2 text-xs text-lime">{fileError}</p>}
        </div>
      )}

      {/* поле ввода */}
      <div className={`flex items-center gap-3 px-5 py-4 sm:px-8 ${chips.length > 0 || step === "files" ? "" : "border-t border-cream/10"}`}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputEnabled) handleText(input);
          }}
          disabled={!inputEnabled}
          placeholder={d.inputPlaceholder}
          className="h-11 flex-1 rounded-full border border-cream/15 bg-cream/5 px-5 text-sm text-cream placeholder:text-sage/60 focus:border-lime/60 focus:outline-none disabled:opacity-40"
        />
        <button
          onClick={() => handleText(input)}
          disabled={!inputEnabled || !input.trim()}
          aria-label="send"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 hover:scale-105 disabled:opacity-40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
