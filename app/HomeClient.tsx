"use client";

import HeroBanner from "@/components/HeroBanner";
import AdvantageCards from "@/components/AdvantageCards";
import MountainDivider from "@/components/MountainDivider";
import ProductCard from "@/components/ProductCard";
import { useT } from "@/lib/i18n";
import type { Product } from "@/lib/data";

export default function HomeClient({ products }: { products: Product[] }) {
  const { t } = useT();
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <HeroBanner />

      {/* Stats */}
      <section className="py-16 bg-white border-b border-sand/30">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "6+", label: t.stat_regions, icon: "🏔️" },
            { value: "50+", label: t.stat_farms, icon: "🤝" },
            { value: "48h", label: t.stat_delivery, icon: "🚛" },
            { value: "9+", label: t.stat_categories, icon: "📦" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-semibold text-text-primary mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <AdvantageCards />
      <MountainDivider />

      {/* Procurement flow */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">{t.flow_title}</h2>
            <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.flow_title_en}</p>
            <p className="text-text-primary/50 max-w-xl mx-auto">{t.flow_subtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: t.flow_step1_title, desc: t.flow_step1_desc, icon: "💬" },
              { step: "02", title: t.flow_step2_title, desc: t.flow_step2_desc, icon: "✅" },
              { step: "03", title: t.flow_step3_title, desc: t.flow_step3_desc, icon: "📋" },
              { step: "04", title: t.flow_step4_title, desc: t.flow_step4_desc, icon: "✈️" },
            ].map(f => (
              <div key={f.step} className="relative bg-white rounded-card p-6 shadow-card text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <div className="text-xs font-bold text-accent mb-2 tracking-widest">{f.step}</div>
                <h3 className="font-bold text-text-primary mb-2">{f.title}</h3>
                <p className="text-text-primary/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MountainDivider />

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent text-xs font-medium mb-4">🔥 {t.seasonal_badge}</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">{t.products_title}</h2>
            <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.products_title_en}</p>
            <p className="text-text-primary/50 max-w-xl mx-auto">{t.products_subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
              {t.products_view_all}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-10 tracking-wide">{t.trust_title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: t.trust_item1_title, desc: t.trust_item1_desc },
              { title: t.trust_item2_title, desc: t.trust_item2_desc },
              { title: t.trust_item3_title, desc: t.trust_item3_desc },
            ].map((item, i) => (
              <div key={i} className="p-6 border border-white/10 rounded-xl">
                <div className="text-3xl mb-4">{["🏔️","✅","🤝"][i]}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
