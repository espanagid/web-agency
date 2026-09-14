"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { dict, Lang } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";

const DEMO_URL = "http://demo.193-37-213-48.nip.io"; // TODO: cambiar al dominio real

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function RevealGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={stagger}
    >
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const hasNumber = !Number.isNaN(numeric) && numeric > 0;
  const prefix = value.match(/^\D*/)?.[0] ?? "";
  const suffix = value.replace(/^[\d.\s]*/, "").replace(prefix, "");
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 1200 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView && hasNumber) motionValue.set(numeric);
  }, [inView, hasNumber, numeric, motionValue]);

  useEffect(() => {
    const unsub = springValue.on("change", (v) => setDisplay(v));
    return () => unsub();
  }, [springValue]);

  if (!hasNumber) {
    return <span ref={ref}>{value}</span>;
  }

  const isDecimal = value.includes(".") && !value.includes("00");
  const shown = isDecimal ? display.toFixed(1) : Math.round(display).toString();

  return (
    <span ref={ref}>
      {value.startsWith(prefix) && !/^\d/.test(prefix) ? prefix : ""}
      {shown}
      {suffix}
    </span>
  );
}

type ChatMsg = { from: "user" | "ai" | "system"; text: string };

function ChatBubble({ msg, delay }: { msg: ChatMsg; delay: number }) {
  const isUser = msg.from === "user";
  const isSystem = msg.from === "system";

  if (isSystem) {
    return (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="text-center text-xs italic text-slate-500"
      >
        {msg.text}
      </motion.p>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.35 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-snug ${
          isUser
            ? "bg-slate-700 text-slate-100"
            : "bg-[var(--color-primary)] text-white shadow-lg shadow-black/20"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start gap-1 px-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-typing-dot rounded-full bg-slate-400"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function HeroChatMockup({ messages }: { messages: readonly ChatMsg[] }) {
  return (
    <div className="relative mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-black/40 backdrop-blur">
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-emerald-400" />
        </span>
        <p className="text-sm font-semibold text-slate-100">Recepcionista IA</p>
        <span className="ml-auto text-xs text-slate-500">online 24/7</span>
      </div>
      <div className="mt-4 space-y-3">
        {messages.map((m, i) => (
          <ChatBubble key={i} msg={m} delay={i * 0.5} />
        ))}
        <motion.div
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 0 }}
          viewport={{ once: true }}
          transition={{ delay: messages.length * 0.5, duration: 0.3 }}
        >
          <TypingDots />
        </motion.div>
      </div>
    </div>
  );
}

function BeforeAfterChat({
  label,
  before,
  after,
}: {
  label: { before: string; after: string };
  before: readonly ChatMsg[];
  after: readonly ChatMsg[];
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-red-500/20 bg-slate-900/60 p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-red-400">{label.before}</p>
        <div className="space-y-3">
          {before.map((m, i) => (
            <ChatBubble key={i} msg={m} delay={i * 0.15} />
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-5">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-emerald-400">{label.after}</p>
        <div className="space-y-3">
          {after.map((m, i) => (
            <ChatBubble key={i} msg={m} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </div>
  );
}

function NicheTicker({ niches }: { niches: readonly string[] }) {
  const items = [...niches, ...niches];
  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-slate-900/60 py-4">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {items.map((n, i) => (
          <span key={i} className="text-sm font-medium text-slate-400">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export function AgencySite({ site }: { site: { name: string } }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved && dict[saved]) setLang(saved);
  }, []);

  const change = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
  };

  const t = dict[lang];
  const accent = "var(--color-accent)";
  const primary = "var(--color-primary)";

  const langBtn = (l: Lang, label: string) => (
    <button
      key={l}
      onClick={() => change(l)}
      className={`rounded-lg px-3 py-1 text-sm font-semibold transition ${
        lang === l ? "bg-white text-slate-900 shadow" : "text-slate-300 hover:text-white"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <span className="text-lg font-bold text-white">
            Webs<span style={{ color: accent }}>IA</span>
          </span>
          <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
            <a href="#planes" className="hover:text-white">{t.nav.plans}</a>
            <a href="#proceso" className="hover:text-white">{t.nav.process}</a>
            <a href="#casos" className="hover:text-white">{t.nav.cases}</a>
            <a href="#faq" className="hover:text-white">{t.nav.faq}</a>
            <a href="#contacto" className="hover:text-white">{t.nav.contact}</a>
          </nav>
          <div className="ml-auto flex items-center gap-1 rounded-xl bg-slate-800 p-1">
            {langBtn("es", "ES")}
            {langBtn("ru", "RU")}
            {langBtn("en", "EN")}
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-24 pt-20">
        <div
          className="animate-blob absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: primary }}
        />
        <div
          className="animate-blob absolute -right-24 top-32 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: accent, animationDelay: "3s" }}
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: accent }}
            >
              {t.hero.badge}
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-4 max-w-xl text-4xl font-bold leading-tight sm:text-5xl"
            >
              {t.hero.title}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-5 max-w-xl text-lg text-slate-300"
            >
              {t.hero.sub}
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-8 flex flex-wrap gap-4">
              <a
                href="#planes"
                className="rounded-xl px-7 py-3 font-semibold text-slate-900 transition hover:scale-[1.02]"
                style={{ backgroundColor: accent }}
              >
                {t.hero.cta1}
              </a>
              <a
                href="#contacto"
                className="rounded-xl border border-slate-600 px-7 py-3 font-semibold text-white transition hover:scale-[1.02] hover:border-white"
              >
                {t.hero.cta2}
              </a>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-12 grid max-w-md grid-cols-3 gap-4"
            >
              {t.hero.stats.map((s, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-white sm:text-3xl">
                    <AnimatedNumber value={s.value} />
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HeroChatMockup messages={t.hero.chat} />
          </motion.div>
        </div>
      </section>

      {/* NICHE TICKER */}
      <NicheTicker niches={t.niches} />

      {/* PROBLEM */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.problem.title}</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-4 md:grid-cols-3">
            {t.problem.items.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
              >
                <span className="text-3xl font-bold text-red-400">✕</span>
                <p className="mt-3 text-slate-300">{p}</p>
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.1} className="mt-12">
            <BeforeAfterChat
              label={t.problem.chatLabel}
              before={t.problem.chatExample.before}
              after={t.problem.chatExample.after}
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="mx-auto mt-10 max-w-2xl rounded-2xl p-6 text-center text-lg font-medium text-white"
              style={{ backgroundColor: primary }}
            >
              {t.problem.solution}
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y border-white/5 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.features.title}</h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {t.features.items.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:-translate-y-1 hover:border-white/20"
              >
                <span className="text-sm font-bold" style={{ color: accent }}>
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold text-white">{s.name}</h3>
                <p className="mt-3 text-slate-400">{s.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.process.title}</h2>
          </Reveal>
          <RevealGroup className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((s) => (
              <motion.div
                key={s.n}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <span className="text-3xl font-bold" style={{ color: accent }}>
                  {s.n}
                </span>
                <h3 className="mt-2 font-bold text-white">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.d}</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CASES */}
      <section id="casos" className="border-y border-white/5 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.cases.title}</h2>
            <p className="mt-3 text-slate-400">{t.cases.sub}</p>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {t.cases.items.map((c, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur"
              >
                <h3 className="font-bold text-white">{c.name}</h3>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xl font-bold text-red-400">{c.before.value}</p>
                    <p className="text-xs text-slate-500">{c.before.label}</p>
                  </div>
                  <span className="text-slate-500">→</span>
                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-400">
                      <AnimatedNumber value={c.after.value} />
                    </p>
                    <p className="text-xs text-slate-500">{c.after.label}</p>
                  </div>
                </div>
                <p className="mt-5 flex-1 text-sm italic text-slate-400">&ldquo;{c.quote}&rdquo;</p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* PRICING */}
      <section id="planes" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.pricing.title}</h2>
          </Reveal>
          <RevealGroup className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
            {t.pricing.items.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`relative flex flex-col rounded-2xl border p-7 transition hover:scale-[1.01] ${
                  i === 1
                    ? "border-2 bg-slate-900 text-white shadow-xl shadow-black/30"
                    : "border-white/10 bg-white/5 backdrop-blur"
                }`}
                style={i === 1 ? { borderColor: accent } : undefined}
              >
                {i === 1 && (
                  <span
                    className="animate-pulse-glow absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-slate-900"
                    style={{ backgroundColor: accent }}
                  >
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <p className="text-sm text-slate-400">{p.tagline}</p>
                <p className="mt-2">
                  <span className="text-4xl font-bold text-white">{p.price}</span>{" "}
                  <span className="text-slate-400">{p.note}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-slate-300">
                  {p.feats.map((f, j) => (
                    <li key={j}>✓ {f}</li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className="mt-7 rounded-xl py-3 text-center font-semibold text-slate-900 transition hover:scale-[1.02]"
                  style={{ backgroundColor: i === 1 ? accent : primary, color: i === 1 ? "#0f172a" : "white" }}
                >
                  {t.pricing.cta}
                </a>
              </motion.div>
            ))}
          </RevealGroup>

          <p className="mt-6 text-center text-sm text-slate-500">{t.pricing.yearly}</p>

          {/* GUARANTEES */}
          <RevealGroup className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {t.pricing.guarantees.map((g, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300"
              >
                <span className="text-lg">✓</span> {g}
              </motion.div>
            ))}
          </RevealGroup>

          {/* ADS */}
          <Reveal className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white">{t.pricing.ads.title}</h3>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2">
            {t.pricing.ads.items.map((a, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur"
              >
                <div className="flex items-baseline justify-between">
                  <h4 className="font-semibold text-white">{a.name}</h4>
                  <span className="text-2xl font-bold" style={{ color: accent }}>
                    {a.price}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{a.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>
          <p className="mt-4 text-center text-sm text-slate-500">{t.pricing.ads.note}</p>

          {/* PACKAGES */}
          <Reveal className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-white">{t.pricing.packages.title}</h3>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-6 md:grid-cols-2">
            {t.pricing.packages.items.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl border-2 p-7"
                style={{ borderColor: accent }}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-semibold text-white">{p.name}</h4>
                  <p className="text-right">
                    <span className="text-2xl font-bold text-white">{p.price}</span>{" "}
                    <span className="text-sm text-slate-400">{p.note}</span>
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-400">{p.desc}</p>
              </motion.div>
            ))}
          </RevealGroup>

          <p className="mt-10 text-center text-xs text-slate-500">{t.pricing.extra}</p>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="border-y border-white/5 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.comparison.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-white/5 text-slate-300">
                  <th className="px-4 py-3 font-semibold" />
                  <th className="px-4 py-3 font-semibold">{t.comparison.title.split(" vs ")[0]}</th>
                  <th className="px-4 py-3 font-semibold" style={{ color: accent }}>
                    WebsIA
                  </th>
                </tr>
              </thead>
              <tbody>
                {t.comparison.rows.map((r, i) => (
                  <motion.tr
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="border-t border-white/5"
                  >
                    <td className="px-4 py-3 font-medium text-slate-200">{r.label}</td>
                    <td className="px-4 py-3 text-slate-500">
                      <span className="mr-2 text-red-400">✕</span>
                      {r.them}
                    </td>
                    <td className="px-4 py-3 text-slate-200">
                      <span className="mr-2 text-emerald-400">✓</span>
                      {r.us}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* DEMO */}
      <Reveal className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-white">{t.demo.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-400">{t.demo.sub}</p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-semibold underline"
          style={{ color: accent }}
        >
          {t.demo.link}
        </a>
      </Reveal>

      {/* FAQ */}
      <section id="faq" className="border-y border-white/5 bg-slate-900/40 px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.faq.title}</h2>
          </Reveal>
          <RevealGroup className="mt-10 space-y-3">
            {t.faq.items.map((f, i) => (
              <motion.div key={i} variants={fadeUp}>
                <FaqItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="px-6 py-20">
        <div className="mx-auto max-w-xl">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-white">{t.contact.title}</h2>
            <p className="mt-3 text-slate-400">{t.contact.sub}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <LeadForm />
          </Reveal>
          <p className="mt-4 text-center text-sm text-slate-500">{t.contact.note}</p>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-sm text-slate-500">
        {t.footer} — {site.name}
      </footer>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-medium text-slate-100"
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="text-xl text-slate-400">
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm text-slate-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
