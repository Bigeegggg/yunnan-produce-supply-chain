import type { Metadata } from "next";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata: Metadata = { title: "后台管理 — 云南高原供应链" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-warm">
      <AdminSidebar />
      <div className="lg:ml-56 pt-14 lg:pt-0 pb-16 lg:pb-0">{children}</div>
    </div>
  );
}
