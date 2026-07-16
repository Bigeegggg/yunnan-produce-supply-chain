"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";

export default function InquireForm() {
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
    if (!customerName || !phone) { setError("请填写称呼和联系方式"); return; }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_name: productName, customer_name: customerName, phone, quantity, notes }),
      });
      if (res.ok) { setSubmitted(true); }
      else { const d = await res.json(); setError(d.error || "提交失败"); }
    } catch { setError("网络错误"); }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-warm pt-28 pb-20">
      <div className="max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary tracking-wide mb-2">咨询下单</h1>
          <p className="text-xs font-light tracking-[0.2em] uppercase text-text-primary/25">Inquiry & Order</p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-card p-8 shadow-card text-center">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-xl font-bold text-text-primary mb-2">提交成功！</h2>
            <p className="text-text-primary/50">我们会尽快与您联系，感谢您的咨询。</p>
            <a href="/products" className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">返回产品页</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card space-y-5">
            {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">意向产品</label>
              <input value={productName} disabled className="w-full px-4 py-3 bg-sand/30 border border-sand rounded-lg text-text-primary/50 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">称呼 *</label>
              <input value={customerName} onChange={e => setCustomerName(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="您的称呼" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">联系方式 *</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} required className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="手机号或微信" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">预计数量</label>
              <input value={quantity} onChange={e => setQuantity(e.target.value)} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary" placeholder="如：100kg/月" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">备注</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="w-full px-4 py-3 bg-white border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" placeholder="其他需求..." />
            </div>
            <button type="submit" disabled={saving} className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
              {saving ? "提交中..." : "提交咨询"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
