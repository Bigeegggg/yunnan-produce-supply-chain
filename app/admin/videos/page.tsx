"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";

interface Video {
  id: number; title: string; url: string; platform: string;
  thumbnail: string; notes: string; created_at: string;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("direct");
  const [thumbnail, setThumbnail] = useState("");
  const [notes, setNotes] = useState("");
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/videos");
    if (res.ok) setVideos(await res.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(d => { if (Array.isArray(d)) setProducts(d); });
  }, []);

  function openNew() { setEditId(null); setTitle(""); setUrl(""); setPlatform("direct"); setThumbnail(""); setNotes(""); setProductId(""); setShowForm(true); }
  function openEdit(v: any) { setEditId(v.id); setTitle(v.title); setUrl(v.url); setPlatform(v.platform); setThumbnail(v.thumbnail); setNotes(v.notes); setProductId(String(v.product_id || "")); setShowForm(true); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || !url) return;
    setSaving(true);
    const apiUrl = editId ? `/api/videos/${editId}` : "/api/videos";
    const method = editId ? "PUT" : "POST";
    await fetch(apiUrl, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, url, platform, thumbnail, notes, product_id: productId ? Number(productId) : 0 }) });
    setSaving(false);
    setShowForm(false);
    fetchData();
  }

  async function deleteVideo(id: number) {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/videos/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">视频管理</h1>
        <button onClick={openNew} className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-sm">+ 新增视频</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card mb-6 space-y-4 border-l-4 border-primary">
          <h3 className="font-bold text-lg text-text-primary">{editId ? "编辑视频" : "新增视频"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-text-primary/50 mb-1">视频标题 *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="如：走进宾川葡萄基地" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-text-primary/50 mb-1">视频链接 *</label>
              <input value={url} onChange={e => setUrl(e.target.value)} required placeholder="YouTube/B站链接 或 MP4直链" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-text-primary/50 mb-1">关联产品</label>
              <select value={productId} onChange={e => setProductId(e.target.value)} className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">不关联（首页展示）</option>
                {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">平台</label>
              <select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="direct">直链 (MP4)</option>
                <option value="youtube">YouTube</option>
                <option value="bilibili">Bilibili</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">封面图 URL</label>
              <input value={thumbnail} onChange={e => setThumbnail(e.target.value)} placeholder="选填" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-primary/50 mb-1">备注</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="视频简介" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={saving} className="px-8 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50">{saving ? "保存中..." : "保存"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-white border border-sand text-text-primary text-sm rounded-lg hover:bg-warm transition-colors">取消</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map(v => (
          <div key={v.id} className="bg-white rounded-card shadow-card overflow-hidden">
            <div className="relative aspect-video bg-black flex items-center justify-center">
              {v.platform === "youtube" || v.platform === "bilibili" ? (
                <span className="text-white/60 text-sm">{v.platform === "youtube" ? "YouTube" : "B站"} 嵌入</span>
              ) : (
                <video src={v.url} className="w-full h-full object-cover" poster={v.thumbnail || undefined} preload="none" />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-text-primary text-sm mb-1">{v.title}</h3>
              <p className="text-text-primary/40 text-xs mb-3">{v.notes || v.platform}</p>
              <div className="flex gap-2">
                <button onClick={() => openEdit(v)} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">编辑</button>
                <button onClick={() => deleteVideo(v.id)} className="px-3 py-1 bg-red-50 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors">删除</button>
              </div>
            </div>
          </div>
        ))}
        {videos.length === 0 && <div className="col-span-full py-16 text-center text-text-primary/30 text-sm">暂无视频，点击右上角新增</div>}
      </div>
    </div>
  );
}
