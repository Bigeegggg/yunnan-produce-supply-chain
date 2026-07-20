import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || "";
  const productId = searchParams.get("product_id") || "";

  const db = getDb();
  if (code) {
    const batch = db.prepare("SELECT * FROM trace_batches WHERE batch_code = ? AND status = 'active'").get(code);
    if (!batch) return NextResponse.json({ error: "未找到该溯源码" }, { status: 404 });
    const product = db.prepare("SELECT name FROM products WHERE id = ?").get((batch as any).product_id) as any;
    return NextResponse.json({ ...(batch as any), product_name: product?.name || "" });
  }
  if (productId) {
    const batches = db.prepare("SELECT * FROM trace_batches WHERE product_id = ? AND status = 'active' ORDER BY created_at DESC").all(Number(productId));
    return NextResponse.json(batches);
  }
  const batches = db.prepare("SELECT t.*, p.name as product_name FROM trace_batches t LEFT JOIN products p ON t.product_id = p.id WHERE t.status = 'active' ORDER BY t.created_at DESC LIMIT 10").all();
  return NextResponse.json(batches);
}
