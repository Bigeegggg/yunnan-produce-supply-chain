"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n";

export default function FooterClient({ settings }: { settings: Record<string, string> }) {
  const { t } = useT();
  const s = settings;
  const companyName = s.company_name || "Yunnan Plateau Supply Chain";
  const phone = s.company_phone || "TBD";
  const email = s.company_email || "TBD";
  const address = s.company_address || "Kunming, Yunnan, China";

  return (
    <footer className="mountain-bg bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">云</span>
              </div>
              <div>
                <span className="text-lg font-bold tracking-wide block">{companyName}</span>
                <span className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Supply Chain</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{t.footer_desc}</p>
            <p className="text-white/30 text-xs mt-2 leading-relaxed">{t.footer_desc_en}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-1">{t.footer_nav}</h4>
            <p className="text-[10px] text-white/30 tracking-wider uppercase mb-4">Navigation</p>
            <div className="space-y-2">
              <Link href="/" className="block text-white/60 hover:text-white text-sm transition-colors">{t.nav_home}</Link>
              <Link href="/products" className="block text-white/60 hover:text-white text-sm transition-colors">{t.nav_products}</Link>
              <Link href="/about" className="block text-white/60 hover:text-white text-sm transition-colors">{t.nav_about}</Link>
              <Link href="/contact" className="block text-white/60 hover:text-white text-sm transition-colors">{t.nav_contact}</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-1">{t.footer_contact}</h4>
            <p className="text-[10px] text-white/30 tracking-wider uppercase mb-4">Contact</p>
            <div className="space-y-2 text-white/60 text-sm">
              <p>📍 {address}</p>
              <p>📞 {phone}</p>
              <p>📧 {email}</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/40 text-sm">
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
