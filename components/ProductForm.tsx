"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface ProductFormProps {
  initial?: {
    id?: number; name?: string; category?: string; origin?: string;
    season?: string; spec?: string; image?: string; description?: string;
    published?: number;
  };
}

export default function ProductForm({ initial }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!initial?.id;
  const [name, setName] = useState(initial?.name || "");
  const [category, setCategory] = useState(initial?.category || "水果类");
  const [origin, setOrigin] = useState(initial?.origin || "");
  const [season, setSeason] = useState(initial?.season || "");
  const [spec, setSpec] = useState(initial?.spec || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [image, setImage] = useState(initial?.image || "");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(initial?.published !== 0);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) { const data = await res.json(); setImage(data.url); }
      else setError("图片上传失败");
    } catch { setError("网络错误"); }
    finally { setUploading(false); }
  }

  function handleImageUrlSubmit() {
    if (imageUrl.trim()) { setImage(imageUrl.trim()); setImageUrl(""); }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !origin) { setError("名称和产地为必填项"); return; }
    setSaving(true);
    setError("");
    const url = isEdit ? `/api/products/${initial!.id}` : "/api/products";
    const method = isEdit ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method, headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, origin, season, spec, image, description, published }),
      });
      if (res.ok) { router.push("/admin/products"); router.refresh(); return; }
      const data = await res.json();
      setError(data.error || "保存失败");
    } catch { setError("网络错误"); }
    finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">产品名称 *</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="如：宾川红提" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">分类 *</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary">
            {["水果类","叶菜类","茄果类","根茎类","菌类"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">产地 *</label>
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="如：大理宾川" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">供应季节</label>
          <input value={season} onChange={(e) => setSeason(e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="如：6月-9月" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">规格</label>
          <input value={spec} onChange={(e) => setSpec(e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="如：5kg/箱" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">描述</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" placeholder="产品特点、口感、种植环境等" />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text-primary mb-2">产品图片</label>
          <div className="flex flex-wrap gap-3 mb-2">
            <label className="px-4 py-2 bg-white border border-sand rounded-lg text-sm cursor-pointer hover:border-primary transition-colors">
              {uploading ? "上传中..." : "📷 上传图片"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
            <div className="flex gap-1">
              <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="px-4 py-2 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary w-48" placeholder="或输入图片URL" />
              <button type="button" onClick={handleImageUrlSubmit} className="px-3 py-2 bg-sand text-text-primary text-sm rounded-lg hover:bg-sand/70 transition-colors">确定</button>
            </div>
          </div>
          {image && (
            <div className="flex items-center gap-3 mt-2">
              <img src={image} alt="预览" className="w-20 h-15 object-cover rounded" />
              <span className="text-xs text-text-primary/40 truncate max-w-xs">{image}</span>
              <button type="button" onClick={() => setImage("")} className="text-red-400 text-xs hover:underline">移除</button>
            </div>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-medium text-text-primary">上架（前台可见）</span>
            <button type="button" onClick={() => setPublished(!published)} className={`relative w-11 h-6 rounded-full transition-colors ${published ? "bg-primary" : "bg-sand"}`}>
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${published ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </label>
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
          {saving ? "保存中..." : isEdit ? "保存修改" : "创建产品"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-white border border-sand text-text-primary rounded-lg hover:bg-warm transition-colors">取消</button>
      </div>
    </form>
  );
}
