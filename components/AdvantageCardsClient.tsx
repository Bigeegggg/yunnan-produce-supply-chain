"use client";

import { useT } from "@/lib/i18n";

export default function AdvantageCardsClient({ settings }: { settings: Record<string, string> }) {
  const { t, lang } = useT();
  const s = settings;

  // Use i18n as primary, DB settings as fallback
  const isEn = lang === "en";
  const advantages = [
    {
      icon: "🌱",
      title: isEn ? "Direct Sourcing" : (s.advantage_1_title || "源头种植"),
      en: "Direct Sourcing",
      description: isEn
        ? "Our partner network spans 50+ farms across all 6 major Yunnan growing regions — from field to freight with total control."
        : s.advantage_1_desc || "云南高原自有合作基地，覆盖大理、昭通、楚雄、红河等核心产区，从田间到餐桌全程可控。"
    },
    {
      icon: "🚛",
      title: isEn ? "Cold Chain Logistics" : (s.advantage_2_title || "冷链直发"),
      en: "Cold Chain Logistics",
      description: isEn
        ? "Produce is pre-cooled at origin and shipped via temperature-controlled logistics, arriving at major cities nationwide within 48 hours."
        : s.advantage_2_desc || "产地预冷 + 全程冷链物流，48 小时内从云南直达全国主要城市，保证新鲜度。"
    },
    {
      icon: "✅",
      title: isEn ? "Full Traceability" : (s.advantage_3_title || "品控溯源"),
      en: "Full Traceability",
      description: isEn
        ? "Every batch can be traced back to the specific farm plot and grower. Green Food certified with transparent pesticide residue testing."
        : s.advantage_3_desc || "每批次产品可追溯至具体种植地块和农户，通过国家绿色食品认证，农残检测透明。"
    },
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
