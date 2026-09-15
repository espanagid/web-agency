import { useState } from "react";
import SplitText, { FadeIn } from "../components/SplitText";
import { trpc } from "@/providers/trpc";
import { WA_LINK } from "../lib/site";
import { useLang } from "../i18n";

/**
 * Простая форма обратной связи: имя, телефон, свободный текст.
 * Заявка сохраняется в CRM и уходит владельцу на email.
 */
export default function ContactForm() {
  const { t, lang } = useLang();
  const d = t.contactForm;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const submit = trpc.leads.submit.useMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending" || !name.trim() || !phone.trim()) return;
    setState("sending");
    try {
      await submit.mutateAsync({
        lang,
        name: name.trim(),
        contact: phone.trim(),
        notes: `[formulario] ${message.trim()}`,
        files: [],
        website: honeypot,
      });
      setState("ok");
      setName("");
      setPhone("");
      setMessage("");
    } catch {
      setState("error");
    }
  }

  const field =
    "w-full rounded-2xl border border-cream/15 bg-cream/5 px-5 py-4 text-sm text-cream placeholder:text-sage/60 focus:border-lime/60 focus:outline-none transition-colors";

  return (
    <section id="contacto" className="bg-olive-deep px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <SplitText as="p" className="eyebrow mb-6">
          {d.eyebrow}
        </SplitText>
        <SplitText as="h2" className="display-section text-cream">
          {d.titleA} <span className="display-accent">{d.titleB}</span>
        </SplitText>
        <FadeIn delay={0.15}>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-sage sm:text-base">{d.sub}</p>
        </FadeIn>

        <FadeIn delay={0.25} className="mt-10">
          {state === "ok" ? (
            <div className="rounded-3xl border border-lime/30 bg-ink/60 p-8 text-center">
              <p className="text-lg font-semibold text-lime">{d.success}</p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="u-link mt-4 inline-block text-sm text-sage hover:text-lime"
              >
                WhatsApp →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={d.name}
                  required
                  maxLength={200}
                  className={field}
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={d.phone}
                  type="tel"
                  required
                  maxLength={60}
                  className={field}
                />
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={d.message}
                rows={4}
                maxLength={4000}
                className={`${field} resize-y`}
              />
              {/* honeypot: невидимо для людей */}
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />
              {state === "error" && <p className="text-sm text-lime">{d.error}</p>}
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full rounded-full bg-lime px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-ink transition-transform duration-300 hover:scale-[1.02] disabled:opacity-60 sm:w-auto"
              >
                {state === "sending" ? d.sending : d.submit}
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
