"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatWidget({
  siteName,
  whatsapp,
}: {
  siteName: string;
  whatsapp?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [msgs, open]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const history = [...msgs, { role: "user" as const, content: text }];
    setMsgs(history);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(-8) }),
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply ?? "Error, inténtalo de nuevo." }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Error de conexión. Inténtalo de nuevo." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[20rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:w-[22rem]">
          <div className="bg-[var(--color-primary)] px-4 py-3 text-white">
            <p className="font-semibold">Asistente de {siteName}</p>
            <p className="text-xs opacity-80">Responde al instante, 24/7</p>
          </div>
          <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4">
            {msgs.length === 0 && (
              <p className="text-sm text-slate-500">
                ¡Hola! ¿En qué puedo ayudarte? Puedo informarte de servicios y precios o
                preparar tu reserva.
              </p>
            )}
            {msgs.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-[var(--color-primary)] px-3 py-2 text-sm text-white"
                    : "mr-auto max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-800"
                }
              >
                {m.content}
              </div>
            ))}
            {busy && <p className="text-xs text-slate-400">escribiendo…</p>}
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-slate-200 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta…"
              className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
              →
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Abrir chat"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-2xl shadow-lg hover:opacity-90"
      >
        {open ? (
          "✕"
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
            <path d="M12 3C6.5 3 2 6.9 2 11.7c0 2.7 1.3 5 3.4 6.7L4 21l3-1.5c1.5.7 3.2 1.1 5 1.1 5.5 0 10-3.9 10-8.8S17.5 3 12 3Zm-4 9a1.4 1.4 0 1 1 0-2.8A1.4 1.4 0 0 1 8 12Zm4 0a1.4 1.4 0 1 1 0-2.8A1.4 1.4 0 0 1 12 12Zm4 0a1.4 1.4 0 1 1 0-2.8A1.4 1.4 0 0 1 16 12Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
