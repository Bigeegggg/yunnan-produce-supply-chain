"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useT } from "@/lib/i18n";

export default function InquireForm() {
  const { t } = useT();
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "";
  const [productName] = useState(initialProduct);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!customerName || !phone) { setError(t.common_error); return; }
    setSaving(true); setError("");
    try {
      const res = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ product_name: productName, customer_name: customerName, phone, quantity, notes }) });
      if (res.ok) { setSubmitted(true); } else { const d = await res.json(); setError(d.error || t.common_error); }
    } catch { setError(t.common_error); }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-warm pt-28 pb-20">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary tracking-wide mb-2">{t.inquire_title}</h1>
          <p className="text-xs font-light tracking-[0.2em] uppercase text-text-primary/25">{t.inquire_title_en}</p>
        </div>
        {submitted ? (
          <div className="bg-white rounded-card p-8 shadow-card text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-text-primary mb-2">{t.inquire_success}</h2>
            <p className="text-text-primary/50">{t.inquire_success_desc}</p>
            <a href="/products" className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">{t.inquire_back}</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card space-y-5">
            {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
            <div><label className="block text-sm font-medium text-text-primary mb-2">{t.inquire_product}</label><input value={productName} disabled className="w-full px-4 py-3 bg-sand/30 border border-sand rounded-lg text-text-primary/50 text-sm" /></div>
            <div><label className="block text-sm font-medium text-text-primary mb-2">{t.inquire_name}</label><input value={customerName} onChange={e => setCustomerName(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder={t.inquire_placeholder_name} /></div>
            <div><label className="block text-sm font-medium text-text-primary mb-2">{t.inquire_phone}</label><input value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder={t.inquire_placeholder_phone} /></div>
            <div><label className="block text-sm font-medium text-text-primary mb-2">{t.inquire_qty}</label><input value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder={t.inquire_placeholder_qty} /></div>
            <div><label className="block text-sm font-medium text-text-primary mb-2">{t.inquire_notes}</label><textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" placeholder={t.inquire_placeholder_notes} /></div>
            <button type="submit" disabled={saving} className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">{saving ? "..." : t.inquire_submit}</button>
          </form>
        )}
      </div>
    </div>
  );
}
