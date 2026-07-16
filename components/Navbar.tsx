"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "首页", en: "Home" },
  { href: "/products", label: "产品展示", en: "Products" },
  { href: "/about", label: "关于我们", en: "About" },
  { href: "/contact", label: "合作咨询", en: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sand/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">云</span>
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold text-primary tracking-wide block">
                云南高原供应链
              </span>
              <span className="text-[10px] text-text-primary/30 tracking-[0.2em] uppercase">
                Yunnan Supply Chain
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary/70 hover:text-primary hover:bg-primary/5"
                }`}
              >
                <span className="block leading-tight">{link.label}</span>
                <span className="block text-[10px] font-normal text-text-primary/30 tracking-wider">{link.en}</span>
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 px-5 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              合作咨询
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-sand/30">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-text-primary/70 hover:text-primary"
                }`}
              >
                {link.label}
                <span className="block text-[10px] font-normal text-text-primary/30 tracking-wider">{link.en}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
