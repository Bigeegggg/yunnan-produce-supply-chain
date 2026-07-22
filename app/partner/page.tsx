"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useT } from "@/lib/i18n";

export default function PartnerPage() {
  const { t } = useT();
  const [videos, setVideos] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [productId, setProductId] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [partnerName, setPartnerName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("partner_name") || "";
    setPartnerName(name);
    if (!name) {
      const n = prompt(t.partner_name_prompt) || "";
      if (n) { localStorage.setItem("partner_name", n); setPartnerName(n); }
    }
    fetch("/api/products").then(r => r.json()).then(d => { if (Array.isArray(d)) setProducts(d); });
    fetch("/api/videos").then(async r => {
      const all = await r.json();
      if (Array.isArray(all)) setVideos(all.filter((v: any) => v.submitted_by === (localStorage.getItem("partner_name") || "")));
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || !url) return;
    setSubmitting(true); setMessage("");
    try {
      const res = await fetch("/api/videos", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, url, platform: "direct", notes, product_id: productId ? Number(productId) : 0, submitted_by: partnerName }) });
      if (res.ok) {
        setMessage(`✅ ${t.partner_success}`); setTitle(""); setUrl(""); setNotes(""); setProductId("");
        const all = await fetch("/api/videos").then(r => r.json());
        if (Array.isArray(all)) setVideos(all.filter((v: any) => v.submitted_by === partnerName));
      }
      else setMessage(`❌ ${t.partner_fail}`);
    } catch { setMessage(`❌ ${t.common_error}`); }
    setSubmitting(false);
  }

  const statusLabel = (s: string) => {
    if (s === "approved") return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">{t.partner_status_approved}</span>;
    if (s === "rejected") return <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">{t.partner_status_rejected}</span>;
    return <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">{t.partner_status_pending}</span>;
  };

  return (
    <div className="min-h-screen bg-warm pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-4xl mb-3">🤝</div>
          <h1 className="text-3xl font-bold text-text-primary tracking-wide mb-2">{t.partner_title}</h1>
          <p className="text-text-primary/40 text-sm">{partnerName} — {t.partner_subtitle}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card mb-10 space-y-4">
          <h2 className="font-bold text-text-primary text-lg">{t.partner_form_title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2"><label className="block text-xs font-medium text-text-primary/50 mb-1">{t.partner_title_field}</label><input value={title} onChange={e => setTitle(e.target.value)} required className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" /></div>
            <div className="sm:col-span-2"><label className="block text-xs font-medium text-text-primary/50 mb-1">{t.partner_url_field}</label><input value={url} onChange={e => setUrl(e.target.value)} required className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" /></div>
            <div><label className="block text-xs font-medium text-text-primary/50 mb-1">{t.partner_product_field}</label><select value={productId} onChange={e => setProductId(e.target.value)} className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"><option value="">None</option>{products.map((p: any) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
            <div><label className="block text-xs font-medium text-text-primary/50 mb-1">{t.partner_notes_field}</label><input value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" /></div>
          </div>
          {message && <div className={`p-3 rounded-lg text-sm font-medium ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{message}</div>}
          <button type="submit" disabled={submitting} className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">{submitting ? "..." : t.partner_submit}</button>
        </form>
        <div>
          <h2 className="font-bold text-text-primary text-lg mb-4">{t.partner_my_submissions}</h2>
          {videos.length === 0 ? <div className="bg-white rounded-card p-8 text-center text-text-primary/30 text-sm">{t.partner_empty}</div> : (
            <div className="space-y-3">{videos.map(v => (
              <div key={v.id} className="bg-white rounded-card p-4 shadow-card flex items-center justify-between">
                <div><h3 className="font-semibold text-text-primary text-sm">{v.title}</h3><p className="text-text-primary/40 text-xs mt-1">{v.created_at?.slice(0, 16)}{v.notes ? ` · ${v.notes}` : ""}</p></div>
                {statusLabel(v.status)}
              </div>
            ))}</div>
          )}
        </div>
      </div>
    </div>
  );
}
