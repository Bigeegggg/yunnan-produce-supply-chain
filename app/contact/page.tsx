"use client";

import { useState, type FormEvent, useEffect } from "react";

const COOPERATION_MODES = [
  { title: "经销合作", description: "面向各地批发市场经销商，提供稳定供应和价格保障，支持小批量试单。", icon: "🤝" },
  { title: "商超直供", description: "为连锁超市、生鲜门店提供定制化供货方案，含预包装、品牌代工。", icon: "🏪" },
  { title: "社区团购", description: "支持社区团购平台一件代发，产地直发，减少中间环节。", icon: "📦" },
  { title: "一件代发", description: "产地一件代发服务，适合电商卖家、直播带货渠道。", icon: "🚀" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(setSettings);
  }, []);

  function handleSubmit(e: FormEvent) { e.preventDefault(); setSubmitted(true); }

  const phone = settings.company_phone || "待补充";
  const email = settings.company_email || "待补充";
  const address = settings.company_address || "云南省昆明市（地址待补充）";

  return (
    <>
      <section className="pt-28 pb-12 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-wide mb-4">合作咨询</h1>
          <p className="text-text-primary/50 max-w-xl mx-auto">期待与您携手，让云南高原的优质蔬果走进千家万户</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-4">合作方式</h2>
            <p className="text-text-primary/50 max-w-xl mx-auto">灵活多样的合作模式，满足不同渠道需求</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COOPERATION_MODES.map((mode) => (
              <div key={mode.title} className="bg-warm rounded-card p-6 shadow-card text-center hover:-translate-y-1 transition-transform">
                <div className="text-4xl mb-4">{mode.icon}</div>
                <h3 className="text-lg font-bold text-text-primary mb-3">{mode.title}</h3>
                <p className="text-sm text-text-primary/50 leading-relaxed">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-wide">在线咨询</h2>
              {submitted ? (
                <div className="bg-primary/10 border border-primary/20 rounded-card p-8 text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-primary mb-2">提交成功！</h3>
                  <p className="text-text-primary/60">感谢您的咨询，我们将尽快与您联系。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div><label className="block text-sm font-medium text-text-primary mb-2">姓名</label><input type="text" required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="您的姓名" /></div>
                  <div><label className="block text-sm font-medium text-text-primary mb-2">手机号</label><input type="tel" required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="您的手机号" /></div>
                  <div><label className="block text-sm font-medium text-text-primary mb-2">公司名称</label><input type="text" className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="您的公司（选填）" /></div>
                  <div><label className="block text-sm font-medium text-text-primary mb-2">需求描述</label><textarea rows={4} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" placeholder="请描述您的合作需求..." /></div>
                  <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">提交咨询</button>
                </form>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-wide">联系方式</h2>
              <div className="space-y-6">
                {[
                  { icon: "📍", title: "地址", detail: address },
                  { icon: "📞", title: "电话", detail: phone },
                  { icon: "📧", title: "邮箱", detail: email },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-primary text-lg">{item.icon}</span></div>
                    <div><h4 className="font-semibold text-text-primary mb-1">{item.title}</h4><p className="text-text-primary/60 text-sm">{item.detail}</p></div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-primary text-lg">💬</span></div>
                  <div><h4 className="font-semibold text-text-primary mb-1">微信</h4><div className="w-32 h-32 bg-sand rounded-card flex items-center justify-center"><span className="text-text-primary/30 text-xs">二维码（待提供）</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
