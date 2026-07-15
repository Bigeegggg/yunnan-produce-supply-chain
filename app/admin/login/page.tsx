"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) { router.push("/admin"); return; }
      setError("密码错误");
    } catch { setError("网络错误，请重试"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">云</span>
          </div>
          <h1 className="text-xl font-bold text-text-primary">后台管理系统</h1>
          <p className="text-text-primary/40 text-sm mt-1">云南高原蔬果供应链</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-card p-6 shadow-card space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">管理密码</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-text-primary"
              placeholder="请输入密码"
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "验证中..." : "登 录"}
          </button>
        </form>
      </div>
    </div>
  );
}
