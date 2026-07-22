"use client";

import { useT } from "@/lib/i18n";

export default function AdvantageCardsClient({ settings }: { settings: Record<string, string> }) {
  const { t } = useT();
  const s = settings;
  const advantages = [
    { icon: "🌱", title: s.advantage_1_title || t.trust_item1_title, en: "Direct Sourcing", description: s.advantage_1_desc || "" },
    { icon: "🚛", title: s.advantage_2_title || t.trust_item2_title, en: "Cold Chain", description: s.advantage_2_desc || "" },
    { icon: "✅", title: s.advantage_3_title || t.trust_item3_title, en: "Traceability", description: s.advantage_3_desc || "" },
  ];

  return (
    <section className="py-20 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">{t.adv_title}</h2>
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.adv_title_en}</p>
          <p className="text-text-primary/50 max-w-xl mx-auto">{t.adv_subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <div key={i} className="bg-white rounded-card p-8 shadow-card hover:shadow-card-hover transition-shadow terrace-edge">
              <div className="text-4xl mb-4">{adv.icon}</div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{adv.title}</h3>
              <p className="text-xs text-text-primary/20 tracking-wider uppercase mb-3">{adv.en}</p>
              <p className="text-text-primary/60 leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
