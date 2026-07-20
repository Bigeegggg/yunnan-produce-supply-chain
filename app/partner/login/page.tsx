"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PartnerLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (res.ok) { router.push("/partner"); return; }
      setError("密码错误");
    } catch { setError("网络错误"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">合</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary">合作伙伴</h1>
          <p className="text-text-primary/40 text-sm mt-1">提交产品视频素材</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">合作密码</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent text-text-primary" placeholder="请输入合作密码" autoFocus />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50">
            {loading ? "验证中..." : "进入提交"}
          </button>
          <p className="text-center text-text-primary/30 text-xs">
            返回 <a href="/" className="text-primary hover:underline">首页</a>
          </p>
        </form>
      </div>
    </div>
  );
}
