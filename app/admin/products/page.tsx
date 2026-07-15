"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Product {
  id: number; name: string; category: string; origin: string;
  season: string; spec: string; image: string; description: string;
  published: number;
}

export default function AdminProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [publishedFilter, setPublishedFilter] = useState(searchParams.get("published") || "");

  const fetchProducts = useCallback(async () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (publishedFilter) params.set("published", publishedFilter);
    const res = await fetch(`/api/products?${params.toString()}`);
    if (res.ok) setProducts(await res.json());
  }, [search, category, publishedFilter]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  async function togglePublished(product: Product) {
    await fetch(`/api/products/${product.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !product.published }),
    });
    fetchProducts();
  }

  async function deleteProduct(id: number) {
    if (!confirm("确定删除该产品？")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-text-primary">产品管理</h1>
        <Link href="/admin/products/new" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">+ 新增产品</Link>
      </div>
      <div className="flex flex-wrap gap-3 mb-6">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="搜索产品名称..." className="px-4 py-2 bg-white border border-sand rounded-lg text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-48" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-2 bg-white border border-sand rounded-lg text-sm text-text-primary">
          <option value="">全部分类</option>
          {["水果类","叶菜类","茄果类","根茎类","菌类"].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={publishedFilter} onChange={(e) => setPublishedFilter(e.target.value)} className="px-4 py-2 bg-white border border-sand rounded-lg text-sm text-text-primary">
          <option value="">全部状态</option>
          <option value="1">已上架</option>
          <option value="0">待上架</option>
        </select>
      </div>
      <div className="bg-white rounded-card shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-warm/50 border-b border-sand/30">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-text-primary/60">图片</th>
                <th className="text-left px-4 py-3 font-medium text-text-primary/60">名称</th>
                <th className="text-left px-4 py-3 font-medium text-text-primary/60">分类</th>
                <th className="text-left px-4 py-3 font-medium text-text-primary/60">产地</th>
                <th className="text-left px-4 py-3 font-medium text-text-primary/60">状态</th>
                <th className="text-left px-4 py-3 font-medium text-text-primary/60">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/20">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-warm/30">
                  <td className="px-4 py-3">
                    {p.image ? <img src={p.image} alt={p.name} className="w-12 h-9 object-cover rounded" /> : <div className="w-12 h-9 bg-sand rounded flex items-center justify-center text-text-primary/20 text-xs">无图</div>}
                  </td>
                  <td className="px-4 py-3 font-medium text-text-primary">{p.name}</td>
                  <td className="px-4 py-3 text-text-primary/50">{p.category}</td>
                  <td className="px-4 py-3 text-text-primary/50">{p.origin}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => togglePublished(p)} className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${p.published ? "bg-green-100 text-green-700" : "bg-accent/10 text-accent"}`}>{p.published ? "上架" : "下架"}</button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${p.id}/edit`} className="text-primary text-xs hover:underline">编辑</Link>
                      <button onClick={() => deleteProduct(p.id)} className="text-red-500 text-xs hover:underline">删除</button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan={6} className="px-4 py-12 text-center text-text-primary/30">暂无产品数据</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
