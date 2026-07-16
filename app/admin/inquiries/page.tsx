"use client";

import { useState, useEffect, useCallback } from "react";

interface Inquiry {
  id: number; product_name: string; customer_name: string; phone: string;
  quantity: string; notes: string; status: string; admin_notes: string; created_at: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "待处理", color: "bg-accent/10 text-accent" },
  { value: "processing", label: "处理中", color: "bg-blue-100 text-blue-700" },
  { value: "contacted", label: "已联系", color: "bg-green-100 text-green-700" },
  { value: "closed", label: "已关闭", color: "bg-gray-100 text-gray-500" },
];

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [filter, setFilter] = useState("");
  const [editingNote, setEditingNote] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/inquiries");
    if (res.ok) setInquiries(await res.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/inquiries/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchData();
  }

  async function saveNote(id: number) {
    setSaving(prev => ({ ...prev, [id]: true }));
    await fetch(`/api/inquiries/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ admin_notes: editingNote[id] || "" }),
    });
    setSaving(prev => ({ ...prev, [id]: false }));
    fetchData();
  }

  const filtered = filter ? inquiries.filter(i => i.status === filter) : inquiries;
  const statusLabel = (s: string) => STATUS_OPTIONS.find(o => o.value === s) || STATUS_OPTIONS[0];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">订单管理</h1>

      <div className="flex gap-2 mb-6">
        {[{ value: "", label: "全部" }, ...STATUS_OPTIONS].map(o => (
          <button key={o.value} onClick={() => setFilter(o.value)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === o.value ? "bg-primary text-white" : "bg-white text-text-primary/60 border border-sand hover:text-primary"}`}>{o.label}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(inq => {
          const st = statusLabel(inq.status);
          return (
            <div key={inq.id} className="bg-white rounded-card p-5 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-bold text-text-primary">{inq.customer_name}</span>
                  <span className="text-text-primary/30 mx-2">|</span>
                  <span className="text-text-primary/60 text-sm">{inq.product_name || "未指定产品"}</span>
                </div>
                <select value={inq.status} onChange={e => updateStatus(inq.id, e.target.value)} className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${st.color}`}>
                  {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-text-primary/50 mb-3">
                <span>📞 {inq.phone}</span>
                <span>📦 {inq.quantity || "-"}</span>
                <span>🕐 {inq.created_at?.slice(0, 16)}</span>
                {inq.notes && <span className="col-span-2">💬 {inq.notes}</span>}
              </div>
              <div className="flex gap-2 items-center pt-3 border-t border-sand/20">
                <input
                  value={editingNote[inq.id] ?? inq.admin_notes}
                  onChange={e => setEditingNote(prev => ({ ...prev, [inq.id]: e.target.value }))}
                  placeholder="内部备注..."
                  className="flex-1 px-3 py-2 bg-warm border border-sand rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  onClick={() => saveNote(inq.id)}
                  disabled={saving[inq.id]}
                  className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
                >保存</button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-center text-text-primary/30 py-12">暂无咨询记录</p>}
      </div>
    </div>
  );
}
