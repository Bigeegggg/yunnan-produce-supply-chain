"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TraceBatch {
  id: number; batch_code: string; product_name: string; product_id: number;
  created_at: string; status: string;
}

export default function TracePage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [recent, setRecent] = useState<TraceBatch[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/trace").then(r => r.json()).then(d => {
      if (Array.isArray(d)) setRecent(d.slice(0, 6));
    });
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim()) return;
    router.push(`/trace/${code.trim()}`);
  }

  return (
    <div className="min-h-screen bg-warm pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="text-3xl font-bold text-text-primary tracking-wide mb-2">溯源查询</h1>
          <p className="text-xs font-light tracking-[0.2em] uppercase text-text-primary/25">Traceability Query</p>
          <p className="text-text-primary/50 text-sm mt-4">输入产品包装上的溯源码或批次号，查看完整溯源信息</p>
        </div>

        <form onSubmit={handleSearch} className="mb-12">
          <div className="flex gap-2">
            <input
              value={code}
              onChange={e => { setCode(e.target.value); setError(""); }}
              placeholder="输入溯源码，如 YN240720A3F2"
              className="flex-1 px-5 py-4 bg-white border-2 border-sand rounded-xl text-lg text-text-primary focus:outline-none focus:border-primary transition-colors"
              autoFocus
            />
            <button type="submit" className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors text-lg">
              查询
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        {recent.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-text-primary/40 uppercase tracking-wider mb-4">最近录入的批次</h3>
            <div className="space-y-2">
              {recent.map(b => (
                <a key={b.id} href={`/trace/${b.batch_code}`} className="flex items-center justify-between bg-white rounded-card p-4 shadow-card hover:shadow-card-hover transition-shadow">
                  <div>
                    <span className="font-mono font-bold text-primary text-sm">{b.batch_code}</span>
                    <span className="text-text-primary/30 mx-3">|</span>
                    <span className="text-text-primary/70 text-sm">{b.product_name}</span>
                  </div>
                  <span className="text-text-primary/30 text-xs">{b.created_at?.slice(0, 10)}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
