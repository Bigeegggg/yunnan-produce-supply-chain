"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Inquiry {
  id: number; product_name: string; customer_name: string; phone: string;
  quantity: string; notes: string; status: string; admin_notes: string;
  created_at: string; updated_at: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "待处理", color: "bg-accent/10 text-accent" },
  { value: "processing", label: "处理中", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "已联系", color: "bg-green-100 text-green-700" },
  { value: "closed", label: "已关闭", color: "bg-gray-100 text-gray-500" },
];

export default function InquiryDetail({ inquiry }: { inquiry: Inquiry }) {
  const router = useRouter();
  const [status, setStatus] = useState(inquiry.status);
  const [adminNotes, setAdminNotes] = useState(inquiry.admin_notes || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    await fetch(`/api/inquiries/${inquiry.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, admin_notes: adminNotes }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  }

  const st = STATUS_OPTIONS.find(o => o.value === status) || STATUS_OPTIONS[0];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="text-text-primary/40 hover:text-primary text-sm mb-6 flex items-center gap-1 transition-colors">
        ← 返回订单列表
      </button>

      <div className="bg-white rounded-card shadow-card overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-sand/20">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-text-primary mb-1">{inquiry.customer_name}</h1>
              <p className="text-text-primary/40 text-sm">咨询 #{inquiry.id} · {inquiry.created_at?.slice(0, 16)}</p>
            </div>
            <select value={status} onChange={e => setStatus(e.target.value)} className={`px-4 py-2 rounded-full text-sm font-bold border-0 cursor-pointer ${st.color}`}>
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Detail cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-warm rounded-lg p-4">
            <div className="text-xs text-text-primary/30 uppercase tracking-wider mb-1">意向产品</div>
            <div className="font-semibold text-text-primary">{inquiry.product_name || "未指定"}</div>
          </div>
          <div className="bg-warm rounded-lg p-4">
            <div className="text-xs text-text-primary/30 uppercase tracking-wider mb-1">联系方式</div>
            <div className="font-semibold text-text-primary">📞 {inquiry.phone}</div>
          </div>
          <div className="bg-warm rounded-lg p-4">
            <div className="text-xs text-text-primary/30 uppercase tracking-wider mb-1">预计数量</div>
            <div className="font-semibold text-text-primary">{inquiry.quantity || "未填写"}</div>
          </div>
          <div className="bg-warm rounded-lg p-4">
            <div className="text-xs text-text-primary/30 uppercase tracking-wider mb-1">最后更新</div>
            <div className="font-semibold text-text-primary text-sm">{inquiry.updated_at?.slice(0, 16)}</div>
          </div>
        </div>

        {/* Customer notes */}
        {inquiry.notes && (
          <div className="px-6 pb-4">
            <div className="bg-accent/5 border border-accent/10 rounded-lg p-4">
              <div className="text-xs text-accent uppercase tracking-wider mb-1">客户备注</div>
              <p className="text-text-primary text-sm leading-relaxed">{inquiry.notes}</p>
            </div>
          </div>
        )}

        {/* Admin notes */}
        <div className="px-6 pb-6">
          <div className="text-xs text-text-primary/30 uppercase tracking-wider mb-2">内部备注</div>
          <textarea
            value={adminNotes}
            onChange={e => setAdminNotes(e.target.value)}
            rows={4}
            placeholder="添加处理记录、客户反馈等..."
            className="w-full px-4 py-3 bg-warm border border-sand rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-text-primary/30">
              {inquiry.admin_notes ? "已有备注记录" : "暂无备注"}
            </p>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? "保存中..." : saved ? "✅ 已保存" : "保存"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
