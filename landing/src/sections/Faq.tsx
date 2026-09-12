import { useState } from "react";
import SplitText, { FadeIn } from "../components/SplitText";
import { useLang } from "../i18n";

export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div>
          <SplitText as="p" className="eyebrow mb-6">
            {t.faq.eyebrow}
          </SplitText>
          <SplitText as="h2" className="display-section text-cream">
            {t.faq.title}
          </SplitText>
        </div>

        <div className="space-y-px overflow-hidden rounded-3xl border border-cream/12">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <FadeIn key={i} delay={i * 0.04}>
                <div className={`${i < t.faq.items.length - 1 ? "border-b border-cream/10" : ""} bg-olive-deep`}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left sm:px-8"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg text-cream sm:text-xl">{f.q}</span>
                    <span
                      className={`shrink-0 font-display text-2xl text-lime transition-transform duration-500 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl px-6 pb-7 text-sm leading-relaxed text-sage sm:px-8 sm:text-base">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
