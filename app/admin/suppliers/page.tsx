"use client";

import { useState, useEffect, useCallback, type FormEvent } from "react";

interface Supplier {
  id: number; name: string; phone: string; notes: string; created_at: string;
}

export default function AdminSuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/suppliers");
    if (res.ok) setSuppliers(await res.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  function openNew() { setEditId(null); setName(""); setPhone(""); setNotes(""); setShowForm(true); }
  function openEdit(s: Supplier) { setEditId(s.id); setName(s.name); setPhone(s.phone); setNotes(s.notes); setShowForm(true); }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name || !phone) return;
    setSaving(true);
    const url = editId ? `/api/suppliers/${editId}` : "/api/suppliers";
    const method = editId ? "PUT" : "POST";
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, phone, notes }) });
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
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">供应商电话簿</h1>
        <button onClick={openNew} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">+ 新增</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-5 shadow-card mb-6 space-y-4">
          <h3 className="font-bold text-text-primary">{editId ? "编辑供应商" : "新增供应商"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={name} onChange={e => setName(e.target.value)} required placeholder="供应商名称" className="px-4 py-2 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <input value={phone} onChange={e => setPhone(e.target.value)} required placeholder="电话" className="px-4 py-2 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <input value={notes} onChange={e => setNotes(e.target.value)} placeholder="备注（选填）" className="w-full px-4 py-2 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark disabled:opacity-50">{saving ? "保存中..." : "保存"}</button>
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 bg-white border border-sand text-sm rounded-lg">取消</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-warm/50 border-b border-sand/30">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-text-primary/60">名称</th>
              <th className="text-left px-4 py-3 font-medium text-text-primary/60">电话</th>
              <th className="text-left px-4 py-3 font-medium text-text-primary/60">备注</th>
              <th className="text-left px-4 py-3 font-medium text-text-primary/60">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/20">
            {suppliers.map(s => (
              <tr key={s.id} className="hover:bg-warm/30">
                <td className="px-4 py-3 font-medium text-text-primary">{s.name}</td>
                <td className="px-4 py-3 text-text-primary/70">{s.phone}</td>
                <td className="px-4 py-3 text-text-primary/40 text-xs max-w-[200px] truncate">{s.notes || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(s)} className="text-primary text-xs hover:underline">编辑</button>
                    <button onClick={() => deleteSupplier(s.id)} className="text-red-500 text-xs hover:underline">删除</button>
                  </div>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && <tr><td colSpan={4} className="px-4 py-12 text-center text-text-primary/30">暂无供应商</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
