"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, lang, toggleLang } = useT();

  const NAV_LINKS = [
    { href: "/", label: t.nav_home },
    { href: "/products", label: t.nav_products },
    { href: "/videos", label: t.nav_videos },
    { href: "/trace", label: t.nav_trace },
    { href: "/about", label: t.nav_about },
    { href: "/contact", label: t.nav_contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sand/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">云</span>
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold text-primary tracking-wide block">
                {t.footer_brand}
              </span>
              <span className="text-[10px] text-text-primary/30 tracking-[0.2em] uppercase">
                Supply Chain
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === link.href ? "bg-primary/10 text-primary" : "text-text-primary/70 hover:text-primary hover:bg-primary/5"}`}>
                {link.label}
              </Link>
            ))}
            <button onClick={toggleLang} className="ml-2 px-3 py-1.5 border border-sand rounded-lg text-xs font-medium text-text-primary/60 hover:text-primary hover:border-primary transition-colors">
              {lang === "en" ? "中文" : "EN"}
            </button>
            <Link href="/contact" className="ml-2 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
              {t.nav_contact}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleLang} className="px-2 py-1 border border-sand rounded text-xs text-text-primary/60">
              {lang === "en" ? "中" : "EN"}
            </button>
            <button className="p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-sand/30">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${pathname === link.href ? "bg-primary/10 text-primary" : "text-text-primary/70 hover:text-primary"}`}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
