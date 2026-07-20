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

      {/* Stats counter — 数据爆发区 */}
      <section className="py-16 bg-white border-b border-sand/30">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "6+", label: "核心产区", en: "Growing Regions", icon: "🏔️" },
            { value: "50+", label: "合作基地", en: "Partner Farms", icon: "🤝" },
            { value: "48h", label: "冷链直达", en: "Cold Chain Delivery", icon: "🚛" },
            { value: "9+", label: "产品品类", en: "Categories", icon: "📦" },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-3xl sm:text-4xl font-bold text-primary">{s.value}</div>
              <div className="text-sm font-semibold text-text-primary mt-1">{s.label}</div>
              <div className="text-xs text-text-primary/30 tracking-wider">{s.en}</div>
            </div>
          ))}
        </div>
      </section>

      <AdvantageCards />
      <MountainDivider />

      {/* Procurement flow — 采购流程 */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">合作流程</h2>
            <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">How We Work</p>
            <p className="text-text-primary/50 max-w-xl mx-auto">四步开启合作，从产地到货架全程无忧</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "咨询选品", desc: "告知需求，我们推荐合适产品与报价", icon: "💬" },
              { step: "02", title: "寄样确认", desc: "免费寄送样品，确认品质与规格", icon: "📮" },
              { step: "03", title: "签约排产", desc: "签订合同，锁定价格与供应周期", icon: "📋" },
              { step: "04", title: "冷链发货", desc: "产地直发，48小时内冷链送达", icon: "✈️" },
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

      {/* Seasonal spotlight — 时令推荐 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent text-xs font-medium mb-4">
              🔥 当季推荐
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">精选产品</h2>
            <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">Featured Products</p>
            <p className="text-text-primary/50 max-w-xl mx-auto">覆盖云南六大核心产区，高原品质，源头直供</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="/products" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20">
              查看全部产品
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Trust footer — 信任区 */}
      <section className="py-16 bg-primary-dark text-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-10 tracking-wide">为什么客户选择我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "源头直供", desc: "云南6大产区自有合作基地，去除中间环节，价格透明" },
              { title: "品质保障", desc: "每批次可溯源，通过国家绿色食品认证，农残检测公开" },
              { title: "专业服务", desc: "一对一客户经理，从选品到物流全程跟进，7×24h响应" },
            ].map((t, i) => (
              <div key={i} className="p-6 border border-white/10 rounded-xl">
                <div className="text-3xl mb-4">{["🏔️","✅","🤝"][i]}</div>
                <h3 className="font-bold text-lg mb-2">{t.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
