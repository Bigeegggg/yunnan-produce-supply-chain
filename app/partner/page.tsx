"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Video {
  id: number; title: string; url: string; platform: string;
  product_name?: string; product_id: number; status: string; notes: string; created_at: string;
}

export default function PartnerPage() {
  const router = useRouter();
  const [videos, setVideos] = useState<Video[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [productId, setProductId] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("partner_name") || "";
    setPartnerName(name);
    if (!name) {
      const n = prompt("请输入您的姓名/公司名（用于标识您的提交）：") || "";
      if (n) { localStorage.setItem("partner_name", n); setPartnerName(n); }
    }
    fetch("/api/products").then(r => r.json()).then(d => { if (Array.isArray(d)) setProducts(d); });
    fetch("/api/videos?status=all").then(async r => {
      if (r.status === 401) { setAuthed(false); return; }
      setAuthed(true);
      const all = await r.json();
      if (Array.isArray(all)) setVideos(all.filter((v: Video) => (v as any).submitted_by === (localStorage.getItem("partner_name") || "")));
    });
  }, []);

  if (!authed && videos.length === 0) {
    // Attempt to auth check
    fetch("/api/products").then(r => {
      if (r.status === 401) router.push("/partner/login");
    });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || !url) return;
    setSubmitting(true);
    setMessage("");
    try {
      const res = await fetch("/api/videos", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, url, platform: "direct", notes, product_id: productId ? Number(productId) : 0, submitted_by: partnerName }),
      });
      if (res.ok) {
        setMessage("✅ 提交成功！等待审核通过后将展示在网站上。");
        setTitle(""); setUrl(""); setNotes(""); setProductId("");
        // Refresh list
        const all = await fetch("/api/videos?status=all").then(r => r.json());
        if (Array.isArray(all)) setVideos(all.filter((v: Video) => (v as any).submitted_by === partnerName));
      } else {
        setMessage("❌ 提交失败，请重试");
      }
    } catch { setMessage("❌ 网络错误"); }
    setSubmitting(false);
  }

  const statusLabel = (s: string) => {
    if (s === "approved") return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">已通过</span>;
    if (s === "rejected") return <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">未通过</span>;
    return <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">审核中</span>;
  };

  return (
    <div className="min-h-screen bg-warm pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">🤝</div>
          <h1 className="text-3xl font-bold text-text-primary tracking-wide mb-2">合作伙伴</h1>
          <p className="text-text-primary/40 text-sm">{partnerName} — 提交您的产品视频素材</p>
        </div>

        {/* Upload form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card mb-10 space-y-4">
          <h2 className="font-bold text-text-primary text-lg">提交视频素材</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-text-primary/50 mb-1">视频标题 *</label>
              <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="如：宾川红提种植基地实拍" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-text-primary/50 mb-1">视频链接 *</label>
              <input value={url} onChange={e => setUrl(e.target.value)} required placeholder="YouTube/B站 或 MP4直链" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">关联产品</label>
              <select value={productId} onChange={e => setProductId(e.target.value)} className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30">
                <option value="">不关联</option>
                {products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">备注</label>
              <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="拍摄时间、地点等" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
            </div>
          </div>
          {message && <div className={`p-3 rounded-lg text-sm font-medium ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{message}</div>}
          <button type="submit" disabled={submitting} className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
            {submitting ? "提交中..." : "提交视频素材"}
          </button>
        </form>

        {/* My submissions */}
        <div>
          <h2 className="font-bold text-text-primary text-lg mb-4">我的提交记录</h2>
          {videos.length === 0 ? (
            <div className="bg-white rounded-card p-8 text-center text-text-primary/30 text-sm">暂无提交记录</div>
          ) : (
            <div className="space-y-3">
              {videos.map(v => (
                <div key={v.id} className="bg-white rounded-card p-4 shadow-card flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary text-sm">{v.title}</h3>
                    <p className="text-text-primary/40 text-xs mt-1">{v.created_at?.slice(0, 16)} {v.notes ? `· ${v.notes}` : ""}</p>
                  </div>
                  {statusLabel(v.status)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
