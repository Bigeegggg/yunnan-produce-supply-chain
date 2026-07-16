"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";

interface Supplier {
  id: number; name: string; phone: string; notes: string; cooperation_record: string; created_at: string;
}

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [cooperationRecord, setCooperationRecord] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/suppliers");
    if (res.ok) setSuppliers(await res.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openNew() { setEditId(null); setName(""); setPhone(""); setNotes(""); setCooperationRecord(""); setShowForm(true); }
  function openEdit(s: Supplier) { setEditId(s.id); setName(s.name); setPhone(s.phone); setNotes(s.notes); setCooperationRecord(s.cooperation_record || ""); setShowForm(true); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setSaving(true);
    const url = editId ? `/api/suppliers/${editId}` : "/api/suppliers";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, notes, cooperation_record: cooperationRecord }) });
    setSaving(false);
    setShowForm(false);
    fetchData();
  }

  async function deleteSupplier(id: number) {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/suppliers/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">供应商电话簿</h1>
        <button onClick={openNew} className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-sm">+ 新增供应商</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card mb-6 space-y-4 border-l-4 border-primary">
          <h3 className="font-bold text-lg text-text-primary">{editId ? "编辑供应商" : "新增供应商"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">供应商名称 *</label>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder="供应商名称" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-xs font-medium text-text-primary/50 mb-1">电话 *</label>
              <input value={phone} onChange={e => setPhone(e.target.value)} required placeholder="电话" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-text-primary/50 mb-1">备注</label>
            <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="备注（选填）" className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-medium text-text-primary/50 mb-1">合作记录</label>
            <textarea value={cooperationRecord} onChange={e => setCooperationRecord(e.target.value)} rows={3} placeholder="历史合作记录、供货品种、价格等..." className="w-full px-4 py-2.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
          </div>
          <div className="flex gap-2 pt-1">
            <button type="submit" disabled={saving} className="px-8 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 transition-colors">{saving ? "保存中..." : "保存"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-white border border-sand text-text-primary text-sm rounded-lg hover:bg-warm transition-colors">取消</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-warm/50 border-b border-sand/30">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">名称</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">电话</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">合作记录</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">备注</th>
              <th className="text-center px-5 py-3 font-medium text-text-primary/60">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/20">
            {suppliers.map(s => (
              <tr key={s.id} className="hover:bg-warm/30">
                <td className="px-5 py-3.5 font-semibold text-text-primary">{s.name}</td>
                <td className="px-5 py-3.5 text-text-primary/70">{s.phone}</td>
                <td className="px-5 py-3.5 text-text-primary/50 text-xs max-w-[180px] truncate">{s.cooperation_record || "-"}</td>
                <td className="px-5 py-3.5 text-text-primary/40 text-xs max-w-[120px] truncate">{s.notes || "-"}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => openEdit(s)} className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">编辑</button>
                    <button onClick={() => deleteSupplier(s.id)} className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors">删除</button>
                  </div>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && <tr><td colSpan={5} className="px-5 py-16 text-center text-text-primary/30">暂无供应商，点击右上角&ldquo;新增供应商&rdquo;添加</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
