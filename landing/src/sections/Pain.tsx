import SplitText, { FadeIn } from "../components/SplitText";
import { useLang } from "../i18n";

/** Секция боли — инверсия: лаймовый фон, чёрный текст. */
export default function Pain() {
  const { t } = useLang();

  return (
    <section className="relative overflow-hidden bg-lime px-5 py-24 text-ink sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SplitText as="p" className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-ink/60">
          {t.pain.eyebrow}
        </SplitText>
        <SplitText as="h2" className="display-section max-w-5xl">
          {t.pain.title}
        </SplitText>

        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-ink/15 md:grid-cols-3">
          {t.pain.items.map((p, i) => (
            <FadeIn key={p.n} delay={i * 0.12} className="bg-lime p-8 sm:p-10">
              <div className="font-display text-sm italic text-ink/50">{p.n}</div>
              <h3 className="mt-4 font-display text-2xl leading-tight">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.d}</p>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-14">
          <p className="max-w-3xl font-display text-2xl italic leading-snug sm:text-3xl">
            {t.pain.q1}{" "}
            <span className="bg-ink px-2 text-lime">{t.pain.qh}</span>{" "}
            {t.pain.q2}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
