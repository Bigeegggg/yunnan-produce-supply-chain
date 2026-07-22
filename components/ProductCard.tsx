"use client";

import Image from "next/image";
import YunnanBadge from "./YunnanBadge";
import type { Product } from "@/lib/data";
import { useT } from "@/lib/i18n";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { t } = useT();

  return (
    <div className="relative bg-white rounded-card shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 overflow-hidden group terrace-edge">
      <a href={`/api/trace/redirect?product_id=${product.id}`} onClick={e => e.stopPropagation()} className="absolute top-3 left-0 z-10">
        <div className="bg-accent text-white text-[11px] font-bold px-3 py-1.5 rounded-r-lg shadow-md flex items-center gap-1 hover:bg-accent-dark transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          {t.card_trace}
        </div>
      </a>

      <a href={`/products/${product.id}`} className="block relative aspect-[4/3] bg-sand overflow-hidden">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-primary/20 text-sm">{t.common_no_data}</div>
        )}
      </a>

      <div className="p-5">
        <a href={`/products/${product.id}`} className="flex items-start justify-between mb-1">
          <h3 className="text-lg font-bold text-text-primary hover:text-primary transition-colors">{product.name}</h3>
          <YunnanBadge text={product.origin} />
        </a>
        <p className="text-text-primary/50 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-4 text-xs text-text-primary/40 mb-4">
          <span className="flex items-center gap-1"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{product.season}</span>
          <span>{product.spec}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-sand/30">
          <a href={`/api/trace/redirect?product_id=${product.id}`} onClick={e => e.stopPropagation()} className="block text-center py-2 bg-accent/10 text-accent text-sm font-semibold rounded-lg hover:bg-accent hover:text-white transition-colors">{t.card_trace}</a>
          <a href={`/inquire?product=${encodeURIComponent(product.name)}`} onClick={e => e.stopPropagation()} className="block text-center py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">{t.card_inquire}</a>
        </div>
      </div>
    </div>
  );
}
