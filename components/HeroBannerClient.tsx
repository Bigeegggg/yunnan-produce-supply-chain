"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function HeroBannerClient({ heroImage }: { heroImage: string }) {
  const { t } = useT();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroImage})` }} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 mountain-bg opacity-20" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-wider mb-4 leading-tight">{t.hero_title}</h1>
        <p className="text-base sm:text-lg font-light tracking-[0.3em] uppercase text-white/60 mb-8">{t.hero_tagline}</p>
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed whitespace-pre-line">{t.hero_subtitle}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/contact" className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors text-lg">{t.hero_cta_contact}</Link>
          <Link href="/products" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-colors text-lg border border-white/20">{t.hero_cta_products}</Link>
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
