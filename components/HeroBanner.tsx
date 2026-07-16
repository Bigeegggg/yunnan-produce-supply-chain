import Link from "next/link";
import { getSettings } from "@/lib/data";

export default function HeroBanner() {
  const s = getSettings();
  const heroImage = s.hero_image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80";
  const heroTitle = s.hero_title || "云南高原蔬果供应链";
  const heroTagline = s.hero_tagline_en || "Yunnan Plateau · Fresh Produce · Global Supply";
  const heroSubtitle = s.hero_subtitle || "源头种植 · 冷链直发 · 品控溯源\n从云岭高原到您的餐桌，我们守护每一口新鲜";

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 mountain-bg opacity-20" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider mb-4 leading-tight">
          {heroTitle}
        </h1>
        <p className="text-base sm:text-lg font-light tracking-[0.3em] uppercase text-white/60 mb-8">
          {heroTagline}
        </p>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed whitespace-pre-line">
          {heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg">
            合作咨询
            <span className="block text-xs font-normal text-white/70 mt-0.5">Get in Touch</span>
          </Link>
          <Link href="/products" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors text-lg border border-white/20">
            查看产品
            <span className="block text-xs font-normal text-white/50 mt-0.5">View Products</span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
