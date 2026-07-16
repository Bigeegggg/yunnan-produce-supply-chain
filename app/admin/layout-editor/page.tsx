"use client";

import { useState, useEffect, type FormEvent } from "react";

export default function LayoutEditorPage() {
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
      if (res.ok) setMessage("✅ 布局已保存，刷新前台查看效果");
      else setMessage("❌ 保存失败");
    } catch { setMessage("❌ 网络错误"); }
    setSaving(false);
  }

  if (!loaded) return <div className="p-6 text-text-primary/40">加载中...</div>;

  const f = (label: string, key: string, type: "input" | "textarea" = "input", placeholder = "") => (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">{label}</label>
      {type === "textarea" ? (
        <textarea value={settings[key] || ""} onChange={e => set(key, e.target.value)} rows={3} placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" />
      ) : (
        <input value={settings[key] || ""} onChange={e => set(key, e.target.value)} placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" />
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">页面布局</h1>
        <p className="text-text-primary/40 text-sm mt-1">自定义前台首页的视觉效果和文案。修改后刷新前台查看。</p>
      </div>

      {message && <div className={`mb-4 p-4 rounded-lg text-center font-medium text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Hero Section */}
        <section className="bg-white rounded-card p-6 shadow-card">
          <h2 className="text-lg font-bold text-text-primary mb-4">🖼️ 首页横幅 (Hero)</h2>
          <div className="space-y-4">
            {f("背景图片 URL", "hero_image", "input", "https://images.unsplash.com/photo-...")}
            {settings.hero_image && (
              <div className="relative h-32 rounded-lg overflow-hidden bg-sand">
                <img src={settings.hero_image} alt="预览" className="w-full h-full object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
            {f("主标题（中文）", "hero_title", "input", "云南高原蔬果供应链")}
            {f("英文标语", "hero_tagline_en", "input", "Yunnan Plateau · Fresh Produce · Global Supply")}
            {f("副标题（中文）", "hero_subtitle", "textarea", "源头种植 · 冷链直发 · 品控溯源")}
          </div>
        </section>

        {/* Preview tip */}
        <div className="bg-accent/5 border border-accent/10 rounded-lg p-4 text-sm text-text-primary/60">
          <p className="font-medium text-accent mb-1">💡 提示</p>
          <p>保存后需刷新前台页面查看效果。背景图片建议使用 Unsplash 直链（1920px 宽）。布局微调和图片裁剪需人工在代码中调整。</p>
        </div>

        <button type="submit" disabled={saving} className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
          {saving ? "保存中..." : "保存布局"}
        </button>
      </form>
    </div>
  );
}
