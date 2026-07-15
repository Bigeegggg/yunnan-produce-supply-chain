import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "云南高原蔬果供应链 — 源头种植 · 冷链直发 · 品控溯源",
  description:
    "专注云南高原蔬果供应链，覆盖大理、昭通、楚雄、红河等核心产区。为经销商、商超、社区团购提供源头直采和冷链配送服务。",
  keywords: "云南蔬果, 高原供应链, 水果批发, 蔬菜供应, 冷链物流",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
