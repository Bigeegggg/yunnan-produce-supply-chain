"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Product } from "@/lib/data";
import { useT } from "@/lib/i18n";

export default function ProductsClient({ products }: { products: Product[] }) {
  const { t } = useT();
  const [activeCategory, setActiveCategory] = useState(t.cat_all);
  const filtered = activeCategory === t.cat_all ? products : products.filter(p => {
    const catMap: Record<string, string> = { [t.cat_fruit]: "水果类", [t.cat_leafy]: "叶菜类", [t.cat_solanum]: "茄果类", [t.cat_root]: "根茎类", [t.cat_mushroom]: "菌类" };
    const cnCat = Object.entries(catMap).find(([k]) => k === activeCategory)?.[1] || activeCategory;
    return p.category === cnCat;
  });

  return (
    <>
      <section className="pt-28 pb-12 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-wide mb-2">{t.nav_products}</h1>
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.products_title_en}</p>
          <p className="text-text-primary/50 max-w-xl mx-auto">{t.products_subtitle}</p>
        </div>
      </section>
      <div className="sticky top-16 z-40 bg-warm/80 backdrop-blur-md border-b border-sand/30 py-4">
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
      </div>
      <section className="py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-text-primary/40 py-20">{t.common_no_data}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
