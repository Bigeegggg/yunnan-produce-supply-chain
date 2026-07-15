"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/admin", label: "仪表盘", icon: "📊" },
  { href: "/admin/products", label: "产品管理", icon: "📦" },
  { href: "/admin/quick-add", label: "快速录入", icon: "⚡" },
  { href: "/admin/settings", label: "网站设置", icon: "⚙️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const linkClass = (href: string) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      pathname === href
        ? "bg-primary/10 text-primary"
        : "text-text-primary/60 hover:text-primary hover:bg-primary/5"
    }`;

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-sand/50 px-4 h-14 flex items-center justify-between">
        <span className="font-bold text-primary text-sm">后台管理</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1 text-text-primary">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-white border-b border-sand/50 shadow-lg px-4 py-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={linkClass(item.href)}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full text-left">
            🚪 退出登录
          </button>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-56 bg-white border-r border-sand/50 z-40">
        <div className="p-5 border-b border-sand/30">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">云</span>
            </div>
            <span className="font-bold text-primary text-sm">后台管理</span>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-sand/30">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-text-primary/60 hover:text-primary hover:bg-primary/5 transition-colors">
            🏠 返回前台
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 w-full text-left transition-colors">
            🚪 退出登录
          </button>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand/50 flex justify-around py-2">
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${
            pathname === item.href ? "text-primary" : "text-text-primary/40"}`}>
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
