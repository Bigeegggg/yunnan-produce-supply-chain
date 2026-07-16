"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import type { Product } from "@/lib/data";

export default function ProductsClient({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const filtered = activeCategory === "全部" ? products : products.filter(p => p.category === activeCategory);

  return (
    <>
      <section className="pt-28 pb-12 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-wide mb-2">
            产品展示
          </h1>
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">
            Our Products
          </p>
          <p className="text-text-primary/50 max-w-xl mx-auto">
            云南高原四季物产，从田间到餐桌的供应链全程把控
          </p>
        </div>
      </section>
      <div className="sticky top-16 z-40 bg-warm/80 backdrop-blur-md border-b border-sand/30 py-4">
        <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
      </div>
      <section className="py-16 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-text-primary/40 py-20">暂无该分类产品</p>
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
