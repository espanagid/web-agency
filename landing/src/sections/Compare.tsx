import SplitText, { FadeIn } from "../components/SplitText";
import { useLang } from "../i18n";

export default function Compare() {
  const { t } = useLang();

  return (
    <section className="bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1200px]">
        <SplitText as="p" className="eyebrow mb-6">
          {t.compare.eyebrow}
        </SplitText>
        <SplitText as="h2" className="display-section max-w-4xl text-cream">
          {t.compare.titleA} <span className="text-sage">{t.compare.titleVs}</span>{" "}
          <span className="display-accent">webs·con·ia</span>
        </SplitText>

        <FadeIn className="mt-16 overflow-hidden rounded-3xl border border-cream/12">
          <div className="grid grid-cols-2 border-b border-cream/12 bg-olive-deep">
            <div className="px-6 py-5 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-sage sm:px-10">
              {t.compare.colA}
            </div>
            <div className="border-l border-cream/12 px-6 py-5 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-lime sm:px-10">
              {t.compare.colB}
            </div>
          </div>
          {t.compare.rows.map(([bad, good], i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div
                className={`grid grid-cols-2 ${i % 2 === 0 ? "bg-ink" : "bg-[#141510]"} ${
                  i < t.compare.rows.length - 1 ? "border-b border-cream/8" : ""
                }`}
              >
                <div className="flex items-center gap-3 px-6 py-5 text-sm text-sage sm:px-10">
                  <span className="text-cream/30">✕</span>
                  {bad}
                </div>
                <div className="flex items-center gap-3 border-l border-cream/12 px-6 py-5 text-sm font-medium text-cream sm:px-10">
                  <span className="text-lime">✓</span>
                  {good}
                </div>
              </div>
            </FadeIn>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
