"use client";

import { useT } from "@/lib/i18n";
import { getSettings } from "@/lib/data";

export default function AboutPage() {
  const { t } = useT();
  const s = getSettings();
  const aboutText = s.about_text || "";
  const defaultText = aboutText || [t.about_desc_p1, t.about_desc_p2, t.about_desc_p3].join("\n");

  return (
    <>
      <section className="pt-28 pb-12 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-wide mb-2">{t.about_title}</h1>
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.about_title_en}</p>
          <p className="text-text-primary/50 max-w-xl mx-auto">{t.about_subtitle}</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary tracking-wide mb-6">{s.company_name || t.about_company_title}</h2>
              <div className="space-y-4 text-text-primary/70 leading-relaxed">
                {defaultText.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="bg-sand rounded-card aspect-[4/3] flex items-center justify-center overflow-hidden">
              {s.about_image ? <img src={s.about_image} alt="" className="w-full h-full object-cover" /> : <span className="text-text-primary/30 text-lg">{t.about_image_placeholder}</span>}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-4">{t.about_bases_title}</h2>
            <p className="text-text-primary/50 max-w-xl mx-auto">{t.about_bases_subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Dali Binchuan", product: "Grapes, Purple Garlic, Citrus", altitude: "Altitude 1,400-1,800m" },
              { name: "Zhaotong", product: "Sugar-Heart Apples, Potatoes", altitude: "Altitude 1,800-2,500m" },
              { name: "Chuxiong Yuanmou", product: "Tomatoes, Onions, Beans", altitude: "Altitude 1,000-1,300m" },
              { name: "Honghe Mengzi", product: "Pomegranates, Loquats", altitude: "Altitude 1,200-1,500m" },
              { name: "Yuxi Tonghai", product: "Leafy Greens", altitude: "Altitude 1,700-1,900m" },
              { name: "Lijiang", product: "Snow Peaches, Apples", altitude: "Altitude 2,200-2,800m" },
            ].map(base => (
              <div key={base.name} className="bg-white rounded-card p-6 shadow-card terrace-edge">
                <h3 className="text-lg font-bold text-text-primary mb-2">{base.name}</h3>
                <p className="text-sm text-text-primary/50 mb-1">Main: {base.product}</p>
                <p className="text-xs text-accent font-medium">{base.altitude}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-4">{t.about_certs_title}</h2>
            <p className="text-text-primary/50 max-w-xl mx-auto">{t.about_certs_subtitle}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {["Green Food Certification", "Organic Product Certification", "Geographical Indication", "ISO Quality Management"].map(cert => (
              <div key={cert} className="bg-sand rounded-card aspect-[3/4] flex items-center justify-center p-4">
                <span className="text-text-primary/30 text-sm text-center">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
