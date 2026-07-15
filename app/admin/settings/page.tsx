"use client";

import { useState, useEffect, type FormEvent } from "react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => { setSettings(d); setLoaded(true); });
  }, []);

  function set(key: string, value: string) {
    setSettings(prev => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(settings) });
      if (res.ok) setMessage("✅ 设置已保存");
      else setMessage("❌ 保存失败");
    } catch { setMessage("❌ 网络错误"); }
    setSaving(false);
  }

  if (!loaded) return <div className="p-6 text-text-primary/40">加载中...</div>;

  const f = (label: string, key: string, type: "input" | "textarea" = "input") => (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">{label}</label>
      {type === "textarea" ? (
        <textarea value={settings[key] || ""} onChange={(e) => set(key, e.target.value)} rows={4} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" />
      ) : (
        <input value={settings[key] || ""} onChange={(e) => set(key, e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" />
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">网站设置</h1>

      {message && <div className={`mb-4 p-4 rounded-lg text-center font-medium text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white rounded-card p-6 shadow-card">
          <h2 className="text-lg font-bold text-text-primary mb-4">公司信息</h2>
          <div className="space-y-4">
            {f("公司名称", "company_name")}
            {f("联系电话", "company_phone")}
            {f("联系邮箱", "company_email")}
            {f("公司地址", "company_address")}
          </div>
        </section>

        <section className="bg-white rounded-card p-6 shadow-card">
          <h2 className="text-lg font-bold text-text-primary mb-4">关于我们</h2>
          <div className="space-y-4">
            {f("企业简介", "about_text", "textarea")}
          </div>
        </section>

        <section className="bg-white rounded-card p-6 shadow-card">
          <h2 className="text-lg font-bold text-text-primary mb-4">合作优势</h2>
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-3 pb-4 border-b border-sand/20 last:border-0 last:pb-0">
                <h3 className="text-sm font-semibold text-primary">优势 {i}</h3>
                {f(`优势 ${i} 标题`, `advantage_${i}_title`)}
                {f(`优势 ${i} 描述`, `advantage_${i}_desc`, "textarea")}
              </div>
            ))}
          </div>
        </section>

        <button type="submit" disabled={saving} className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
          {saving ? "保存中..." : "保存设置"}
        </button>
      </form>
    </div>
  );
}
