"use client";

import { useState, type FormEvent } from "react";

export default function QuickAddPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("水果类");
  const [origin, setOrigin] = useState("");
  const [spec, setSpec] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) { const d = await res.json(); setImage(d.url); }
    } catch {}
    setUploading(false);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !origin) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/products", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, origin, season: "", spec, image, description, published: true }),
      });
      if (res.ok) {
        setMessage(`✅ "${name}" 已上架！`);
        setName(""); setOrigin(""); setSpec(""); setDescription(""); setImage("");
      } else {
        setMessage("❌ 保存失败，请重试");
      }
    } catch { setMessage("❌ 网络错误"); }
    setSaving(false);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">⚡</div>
        <h1 className="text-2xl font-bold text-text-primary">快速录入</h1>
        <p className="text-text-primary/40 text-sm mt-1">移动端优化 · 30 秒完成上架</p>
      </div>

      {message && <div className={`mb-4 p-4 rounded-lg text-center font-medium text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">产品名称 *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary text-lg" placeholder="如：宾川红提" autoFocus />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">分类</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary">
            {["水果类","叶菜类","茄果类","根茎类","菌类"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">产地 *</label>
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="如：大理宾川" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">规格</label>
          <input value={spec} onChange={(e) => setSpec(e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="如：5kg/箱" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">描述</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" placeholder="口感、环境等" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">拍照上传</label>
          <label className="flex items-center justify-center w-full h-24 bg-white border-2 border-dashed border-sand rounded-lg cursor-pointer hover:border-primary transition-colors">
            {uploading ? "上传中..." : image ? "✅ 图片已上传（点击换图）" : "📷 点击拍照或选择图片"}
            <input type="file" accept="image/*" capture="environment" onChange={handleImageUpload} className="hidden" disabled={uploading} />
          </label>
          {image && <img src={image} alt="" className="mt-2 w-full h-32 object-cover rounded-lg" />}
        </div>
        <button type="submit" disabled={saving} className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-xl transition-colors disabled:opacity-50 shadow-lg shadow-primary/20">
          {saving ? "保存中..." : "保存并上架 🚀"}
        </button>
      </form>
    </div>
  );
}
