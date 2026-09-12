"use client";

import { useEffect, useState } from "react";
import { dict, Lang } from "@/lib/i18n";
import { LeadForm } from "@/components/LeadForm";

const DEMO_URL = "http://demo.193-37-213-48.nip.io"; // TODO: cambiar al dominio real

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
    <div className="min-h-screen bg-white">
      {/* NAV */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-3">
          <span className="text-lg font-bold text-white">Webs<span style={{ color: accent }}>IA</span></span>
          <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
            <a href="#planes" className="hover:text-white">{t.nav.plans}</a>
            <a href="#proceso" className="hover:text-white">{t.nav.process}</a>
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
      <section className="bg-slate-900 px-6 pb-24 pt-20 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: accent }}>
          {t.hero.badge}
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">{t.hero.sub}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#planes"
            className="rounded-xl px-7 py-3 font-semibold text-slate-900"
            style={{ backgroundColor: accent }}
          >
            {t.hero.cta1}
          </a>
          <a
            href="#contacto"
            className="rounded-xl border border-slate-600 px-7 py-3 font-semibold text-white hover:border-white"
          >
            {t.hero.cta2}
          </a>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold">{t.problem.title}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {t.problem.items.map((p, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
                <span className="text-3xl font-bold" style={{ color: primary }}>✕</span>
                <p className="mt-3 text-slate-700">{p}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl rounded-2xl p-6 text-center text-lg font-medium text-white" style={{ backgroundColor: primary }}>
            {t.problem.solution}
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">{t.services.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.services.items.map((s, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="text-sm font-bold" style={{ color: accent }}>0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{s.name}</h3>
                <p className="mt-3 text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="planes" className="px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold">{t.pricing.title}</h2>
          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-2">
            {t.pricing.items.map((p, i) => (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  i === 1 ? "border-2 bg-slate-900 text-white shadow-xl" : "border-slate-200 bg-white shadow-sm"
                }`}
                style={i === 1 ? { borderColor: accent } : undefined}
              >
                {i === 1 && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-slate-900"
                    style={{ backgroundColor: accent }}
                  >
                    {t.pricing.popular}
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className={`text-sm ${i === 1 ? "text-slate-300" : "text-slate-500"}`}>{p.tagline}</p>
                <p className="mt-2">
                  <span className="text-4xl font-bold">{p.price}</span>{" "}
                  <span className={i === 1 ? "text-slate-300" : "text-slate-500"}>{p.note}</span>
                </p>
                <ul className={`mt-6 flex-1 space-y-2 text-sm ${i === 1 ? "text-slate-200" : "text-slate-600"}`}>
                  {p.feats.map((f, j) => (
                    <li key={j}>✓ {f}</li>
                  ))}
                </ul>
                <a
                  href="#contacto"
                  className={`mt-7 rounded-xl py-3 text-center font-semibold ${
                    i === 1 ? "text-slate-900" : "text-white"
                  }`}
                  style={{ backgroundColor: i === 1 ? accent : primary }}
                >
                  {t.pricing.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">{t.pricing.yearly}</p>

          {/* GUARANTEES */}
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {t.pricing.guarantees.map((g, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
                <span className="text-lg">✓</span> {g}
              </div>
            ))}
          </div>

          {/* ADS */}
          <h3 className="mt-16 text-center text-2xl font-bold">{t.pricing.ads.title}</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.pricing.ads.items.map((a, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-baseline justify-between">
                  <h4 className="font-semibold">{a.name}</h4>
                  <span className="text-2xl font-bold" style={{ color: primary }}>{a.price}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">{t.pricing.ads.note}</p>

          {/* PACKAGES */}
          <h3 className="mt-16 text-center text-2xl font-bold">{t.pricing.packages.title}</h3>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {t.pricing.packages.items.map((p, i) => (
              <div key={i} className="rounded-2xl border-2 p-7" style={{ borderColor: accent }}>
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-semibold">{p.name}</h4>
                  <p className="text-right">
                    <span className="text-2xl font-bold">{p.price}</span>{" "}
                    <span className="text-sm text-slate-500">{p.note}</span>
                  </p>
                </div>
                <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-slate-400">{t.pricing.extra}</p>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">{t.process.title}</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-slate-200 bg-white p-6">
                <span className="text-3xl font-bold" style={{ color: accent }}>{s.n}</span>
                <h3 className="mt-2 font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold">{t.demo.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">{t.demo.sub}</p>
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-semibold underline"
          style={{ color: primary }}
        >
          {t.demo.link}
        </a>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold">{t.faq.title}</h2>
          <div className="mt-10 space-y-3">
            {t.faq.items.map((f, i) => (
              <details key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-2 text-sm text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contacto" className="px-6 py-20">
        <div className="mx-auto max-w-xl">
          <h2 className="text-center text-3xl font-bold">{t.contact.title}</h2>
          <p className="mt-3 text-center text-slate-600">{t.contact.sub}</p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <LeadForm />
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">{t.contact.note}</p>
        </div>
      </section>

      <footer className="bg-slate-900 px-6 py-8 text-center text-sm text-slate-400">
        {t.footer} — {site.name}
      </footer>
    </div>
  );
}
