import Link from "next/link";
import { getSettings } from "@/lib/data";

export default function Footer() {
  const s = getSettings();
  const companyName = s.company_name || "云南高原供应链";
  const phone = s.company_phone || "电话待补充";
  const email = s.company_email || "邮箱待补充";
  const address = s.company_address || "云南省昆明市（地址待补充）";

  return (
    <footer className="mountain-bg bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">云</span>
              </div>
              <span className="text-lg font-bold tracking-wide">{companyName}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">专注云南高原蔬果供应链，源头直采，冷链直达。从田间到餐桌，我们守护每一口新鲜。</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">快速导航</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-white/60 hover:text-white text-sm transition-colors">首页</Link>
              <Link href="/products" className="block text-white/60 hover:text-white text-sm transition-colors">产品展示</Link>
              <Link href="/about" className="block text-white/60 hover:text-white text-sm transition-colors">关于我们</Link>
              <Link href="/contact" className="block text-white/60 hover:text-white text-sm transition-colors">合作咨询</Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">联系我们</h4>
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
