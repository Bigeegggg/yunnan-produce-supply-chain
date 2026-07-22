"use client";

import { useState, type FormEvent, useEffect } from "react";
import { useT } from "@/lib/i18n";

export default function ContactPage() {
  const { t } = useT();
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(setSettings);
  }, []);

  function handleSubmit(e: FormEvent) { e.preventDefault(); setSubmitted(true); }

  const phone = settings.company_phone || "TBD";
  const email = settings.company_email || "TBD";
  const address = settings.company_address || "Kunming, Yunnan";
  const wechat = settings.company_wechat || "TBD";

  const COOPERATION_MODES = [
    { title: t.coop_dealer, description: t.coop_dealer_desc, icon: "🤝" },
    { title: t.coop_supermarket, description: t.coop_supermarket_desc, icon: "🏪" },
    { title: t.coop_group, description: t.coop_group_desc, icon: "📦" },
    { title: t.coop_dropship, description: t.coop_dropship_desc, icon: "🚀" },
  ];

  const FAQ_ITEMS = [
    { q: t.faq_q1, a: t.faq_a1 },
    { q: t.faq_q2, a: t.faq_a2 },
    { q: t.faq_q3, a: t.faq_a3 },
    { q: t.faq_q4, a: t.faq_a4 },
    { q: t.faq_q5, a: t.faq_a5 },
  ];

  return (
    <>
      <section className="pt-28 pb-12 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-wide mb-2">{t.contact_title}</h1>
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.contact_title_en}</p>
          <p className="text-text-primary/50 max-w-xl mx-auto">{t.contact_subtitle}</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-text-primary tracking-wide mb-2">{t.faq_title}</h2>
            <p className="text-xs font-light tracking-[0.2em] uppercase text-text-primary/25">{t.faq_title_en}</p>
          </div>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="bg-warm rounded-card group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-text-primary list-none flex items-center justify-between">
                  {item.q}
                  <svg className="w-4 h-4 text-text-primary/30 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-4 text-text-primary/60 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">{t.contact_coop_title}</h2>
            <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.contact_coop_title_en}</p>
            <p className="text-text-primary/50 max-w-xl mx-auto">{t.contact_coop_subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COOPERATION_MODES.map(mode => (
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
              <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-wide">{t.contact_form_title}</h2>
              {submitted ? (
                <div className="bg-primary/10 border border-primary/20 rounded-card p-8 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{t.contact_form_success}</h3>
                  <p className="text-text-primary/60">{t.contact_form_success_desc}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div><label className="block text-sm font-medium text-text-primary mb-2">{t.contact_form_name}</label><input type="text" required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" /></div>
                  <div><label className="block text-sm font-medium text-text-primary mb-2">{t.contact_form_phone}</label><input type="tel" required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" /></div>
                  <div><label className="block text-sm font-medium text-text-primary mb-2">{t.contact_form_company}</label><input type="text" className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" /></div>
                  <div><label className="block text-sm font-medium text-text-primary mb-2">{t.contact_form_desc}</label><textarea rows={4} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" /></div>
                  <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors">{t.contact_form_submit}</button>
                </form>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-wide">{t.contact_info_title}</h2>
              <div className="space-y-6">
                {[
                  { icon: "📍", title: t.contact_address, detail: address },
                  { icon: "📞", title: t.contact_phone, detail: phone },
                  { icon: "📧", title: t.contact_email, detail: email },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-primary text-lg">{item.icon}</span></div>
                    <div><h4 className="font-semibold text-text-primary mb-1">{item.title}</h4><p className="text-text-primary/60 text-sm">{item.detail}</p></div>
                  </div>
                ))}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"><span className="text-primary text-lg">💬</span></div>
                  <div><h4 className="font-semibold text-text-primary mb-1">{t.contact_wechat}</h4><p className="text-text-primary/60 text-sm">{wechat}</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
