"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface TraceBatch {
  id: number; batch_code: string; product_name: string; product_id: number;
  status: string; created_at: string;
}

export default function AdminTracePage() {
  const [batches, setBatches] = useState<TraceBatch[]>([]);

  const fetchData = useCallback(async () => {
    const res = await fetch("/api/trace/admin");
    if (res.ok) setBatches(await res.json());
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function toggleStatus(b: TraceBatch) {
    await fetch(`/api/trace/admin/${b.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: b.status === "active" ? "archived" : "active" }),
    });
    fetchData();
  }

  async function deleteBatch(id: number) {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/trace/admin/${id}`, { method: "DELETE" });
    fetchData();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">溯源批次管理</h1>
        <Link href="/admin/trace/new" className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors shadow-sm">+ 新增批次</Link>
      </div>

      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-warm/50 border-b border-sand/30">
            <tr>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">溯源码</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">产品</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">状态</th>
              <th className="text-left px-5 py-3 font-medium text-text-primary/60">创建时间</th>
              <th className="text-center px-5 py-3 font-medium text-text-primary/60">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/20">
            {batches.map(b => (
              <tr key={b.id} className="hover:bg-warm/30">
                <td className="px-5 py-3.5 font-mono font-bold text-primary text-xs">{b.batch_code}</td>
                <td className="px-5 py-3.5 font-medium text-text-primary">{b.product_name}</td>
                <td className="px-5 py-3.5">
                  <button onClick={() => toggleStatus(b)} className={`px-2.5 py-1 rounded-full text-xs font-medium ${b.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                    {b.status === "active" ? "活跃" : "已归档"}
                  </button>
                </td>
                <td className="px-5 py-3.5 text-text-primary/50 text-xs">{b.created_at?.slice(0, 10)}</td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2 justify-center">
                    <Link href={`/admin/trace/${b.id}/edit`} className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors">编辑</Link>
                    <button onClick={() => deleteBatch(b.id)} className="px-4 py-1.5 bg-red-50 text-red-500 text-xs font-semibold rounded-lg hover:bg-red-500 hover:text-white transition-colors">删除</button>
                  </div>
                </td>
              </tr>
            ))}
            {batches.length === 0 && <tr><td colSpan={5} className="px-5 py-16 text-center text-text-primary/30">暂无溯源批次</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
