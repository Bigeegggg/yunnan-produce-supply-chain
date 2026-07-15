import HeroBanner from "@/components/HeroBanner";
import AdvantageCards from "@/components/AdvantageCards";
import MountainDivider from "@/components/MountainDivider";
import ProductCard from "@/components/ProductCard";
import { getPublishedProducts, type Product } from "@/lib/data";

export default function Home() {
  const products = getPublishedProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <>
      <HeroBanner />
      <AdvantageCards />
      <MountainDivider />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-4">精选产品</h2>
            <p className="text-text-primary/50 max-w-xl mx-auto">覆盖云南六大核心产区，高原品质，源头直供</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/products" className="inline-flex items-center gap-2 px-6 py-3 text-primary font-semibold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
              查看全部产品
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
