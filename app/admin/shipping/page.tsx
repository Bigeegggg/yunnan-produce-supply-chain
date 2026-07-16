"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";

interface ShippingMethod {
  id: number; name: string; type: string; contact: string; notes: string; created_at: string;
}

export default function AdminShippingPage() {
  const [items, setItems] = useState<ShippingMethod[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/shipping");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openNew() { setEditId(null); setName(""); setType(""); setContact(""); setNotes(""); setShowForm(true); }
  function openEdit(s: ShippingMethod) { setEditId(s.id); setName(s.name); setType(s.type); setContact(s.contact); setNotes(s.notes); setShowForm(true); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name) return;
    setSaving(true);
    const url = editId ? `/api/shipping/${editId}` : "/api/shipping";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, type, contact, notes }) });
    setSaving(false);
    setShowForm(false);
    fetchData();
  }

  async function deleteItem(id: number) {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/shipping/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">运输方式</h1>
        <button onClick={openNew} className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-sm">+ 新增运输方式</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card mb-6 space-y-4 border-l-4 border-primary">
          <h3 className="font-bold text-lg text-text-primary">{editId ? "编辑运输方式" : "新增运输方式"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">运输方式名称 *</label>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder="如：冷链专车" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">运输种类</label>
              <input value={type} onChange={e => setType(e.target.value)} placeholder="如：冷链 / 常温 / 空运 / 铁路" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-primary/50 mb-1">联系方式</label>
            <input value={contact} onChange={e => setContact(e.target.value)} placeholder="负责人电话或微信" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-primary/50 mb-1">备注</label>
            <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="覆盖区域、时效、价格等..." className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={saving} className="px-8 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50">{saving ? "保存中..." : "保存"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-white border border-sand text-text-primary text-sm rounded-lg hover:bg-warm transition-colors">取消</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-warm/50 border-b border-sand/30">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">运输方式</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">种类</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">联系方式</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">备注</th>
              <th className="text-center px-5 py-3 font-medium text-text-primary/60">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/20">
            {items.map(s => (
              <tr key={s.id} className="hover:bg-warm/30">
                <td className="px-5 py-3.5 font-semibold text-text-primary">{s.name}</td>
                <td className="px-5 py-3.5"><span className="px-2.5 py-1 bg-primary/5 text-primary text-xs rounded-full">{s.type || "-"}</span></td>
                <td className="px-5 py-3.5 text-text-primary/70">{s.contact || "-"}</td>
                <td className="px-5 py-3.5 text-text-primary/40 text-xs max-w-[150px] truncate">{s.notes || "-"}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => openEdit(s)} className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">编辑</button>
                    <button onClick={() => deleteItem(s.id)} className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors">删除</button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan={5} className="px-5 py-16 text-center text-text-primary/30">暂无运输方式，点击右上角新增</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
