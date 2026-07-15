import { getDb, initDb } from "@/lib/db";
import Link from "next/link";

export default function AdminDashboardPage() {
  initDb();
  const db = getDb();

  const total = (db.prepare("SELECT COUNT(*) as c FROM products").get() as { c: number }).c;
  const published = (db.prepare("SELECT COUNT(*) as c FROM products WHERE published = 1").get() as { c: number }).c;
  const unpublished = total - published;
  const categories = (db.prepare("SELECT COUNT(DISTINCT category) as c FROM products").get() as { c: number }).c;

  const STATS = [
    { label: "全部产品", value: total, color: "bg-primary", href: "/admin/products" },
    { label: "已上架", value: published, color: "bg-green-500", href: "/admin/products?published=1" },
    { label: "待上架", value: unpublished, color: "bg-accent", href: "/admin/products?published=0" },
    { label: "产品分类", value: categories, color: "bg-blue-500", href: "/admin/products" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">仪表盘</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((s) => (
          <Link key={s.label} href={s.href} className="bg-white rounded-card p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <div className={`w-3 h-3 rounded-full ${s.color} mb-3`} />
            <div className="text-2xl font-bold text-text-primary">{s.value}</div>
            <div className="text-sm text-text-primary/50 mt-1">{s.label}</div>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/products/new" className="bg-white rounded-card p-6 shadow-card hover:shadow-card-hover transition-shadow text-center group">
          <div className="text-3xl mb-2">➕</div>
          <div className="font-semibold text-text-primary group-hover:text-primary transition-colors">新增产品</div>
          <div className="text-xs text-text-primary/40 mt-1">完整表单录入</div>
        </Link>
        <Link href="/admin/quick-add" className="bg-white rounded-card p-6 shadow-card hover:shadow-card-hover transition-shadow text-center group">
          <div className="text-3xl mb-2">⚡</div>
          <div className="font-semibold text-text-primary group-hover:text-primary transition-colors">快速录入</div>
          <div className="text-xs text-text-primary/40 mt-1">谈判现场 30 秒上架</div>
        </Link>
        <Link href="/admin/settings" className="bg-white rounded-card p-6 shadow-card hover:shadow-card-hover transition-shadow text-center group">
          <div className="text-3xl mb-2">⚙️</div>
          <div className="font-semibold text-text-primary group-hover:text-primary transition-colors">网站设置</div>
          <div className="text-xs text-text-primary/40 mt-1">修改联系方式与文案</div>
        </Link>
      </div>
    </div>
  );
}
