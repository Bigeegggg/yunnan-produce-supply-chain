"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Product { id: number; name: string; }

interface TraceFormProps {
  initial?: {
    id?: number; product_id?: number; batch_code?: string;
    origin_info?: string; production_info?: string;
    testing_info?: string; logistics_info?: string;
    status?: string;
  };
}

export default function TraceForm({ initial }: TraceFormProps) {
  const router = useRouter();
  const isEdit = !!initial?.id;
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState(initial?.product_id || 0);
  const [originInfo, setOriginInfo] = useState(initial?.origin_info || "");
  const [productionInfo, setProductionInfo] = useState(initial?.production_info || "");
  const [testingInfo, setTestingInfo] = useState(initial?.testing_info || "");
  const [logisticsInfo, setLogisticsInfo] = useState(initial?.logistics_info || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products").then(r => r.json()).then(d => {
      if (Array.isArray(d)) setProducts(d);
    });
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!productId) { setError("请选择产品"); return; }
    setSaving(true);
    setError("");
    const url = isEdit ? `/api/trace/admin/${initial!.id}` : "/api/trace/admin";
    const method = isEdit ? "PUT" : "POST";
    const body: any = { product_id: productId, origin_info: originInfo, production_info: productionInfo, testing_info: testingInfo, logistics_info: logisticsInfo };
    if (isEdit && initial?.status) body.status = initial.status;
    try {
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (res.ok) { router.push("/admin/trace"); router.refresh(); return; }
      const d = await res.json();
      setError(d.error || "保存失败");
    } catch { setError("网络错误"); }
    setSaving(false);
  }

  const f = (label: string, value: string, onChange: (v: string) => void, placeholder: string) => (
    <div>
      <label className="block text-sm font-medium text-text-primary mb-2">{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={4} placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary resize-none" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

      <div className="bg-white rounded-card p-6 shadow-card space-y-5 mb-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">关联产品 *</label>
          <select value={productId} onChange={e => setProductId(Number(e.target.value))} className="w-full px-4 py-3 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 text-text-primary">
            <option value={0}>请选择产品</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        {isEdit && initial?.batch_code && (
          <div className="bg-warm rounded-lg p-3 flex items-center gap-2">
            <span className="text-text-primary/40 text-xs">溯源码:</span>
            <span className="font-mono font-bold text-primary text-sm">{initial.batch_code}</span>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6">
        {f("📍 产地信息", originInfo, setOriginInfo, "农场名称、地址、种植/养殖信息、资质证书等")}
        {f("🏭 生产加工", productionInfo, setProductionInfo, "加工批次号、生产线、操作人员、加工时间等")}
        {f("🔬 质量检测", testingInfo, setTestingInfo, "检测机构、检测项目（农药残留、重金属等）、检测结果、报告编号等")}
        {f("📦 仓储物流", logisticsInfo, setLogisticsInfo, "入库时间、温湿度记录、物流公司、运单号等")}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
          {saving ? "保存中..." : isEdit ? "保存修改" : "创建批次"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-6 py-3 bg-white border border-sand text-text-primary rounded-lg hover:bg-warm transition-colors">取消</button>
      </div>
    </form>
  );
}
