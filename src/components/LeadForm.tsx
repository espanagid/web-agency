"use client";

import { useState } from "react";

export function LeadForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        phone: fd.get("phone"),
        message: fd.get("message"),
        company: fd.get("company"), // honeypot: debe estar vacío
      }),
    });
    setState(res.ok ? "sent" : "error");
  }

  if (state === "sent") {
    return (
      <p className="py-6 text-center font-medium text-[var(--color-primary)]">
        ¡Gracias! Te contactamos muy pronto.
      </p>
    );
  }

  const input =
    "w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-[var(--color-primary)] focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot anti-bots: invisible para humanos */}
      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] top-auto h-0 w-0 opacity-0"
      />
      <input name="name" required placeholder="Tu nombre" className={input} />
      <input name="phone" type="tel" required placeholder="Tu teléfono" className={input} />
      <textarea
        name="message"
        rows={3}
        placeholder="¿Qué necesitas? (servicio, día y hora preferida)"
        className={input}
      />
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-xl bg-[var(--color-primary)] py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        {state === "sending" ? "Enviando…" : "Enviar solicitud"}
      </button>
      {state === "error" && (
        <p className="text-sm text-red-600">Error al enviar. Escríbenos por WhatsApp.</p>
      )}
    </form>
  );
}
