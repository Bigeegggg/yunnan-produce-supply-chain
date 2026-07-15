import Image from "next/image";
import YunnanBadge from "./YunnanBadge";
import type { Product } from "@/data/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-card shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 overflow-hidden group terrace-edge">
      {/* 图片区 */}
      <div className="relative aspect-[4/3] bg-sand overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* 信息区 */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-text-primary">{product.name}</h3>
          <YunnanBadge text={product.origin} />
        </div>
        <p className="text-text-primary/50 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-4 text-xs text-text-primary/40">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {product.season}
          </span>
          <span>{product.spec}</span>
        </div>
      </div>
    </div>
  );
}
