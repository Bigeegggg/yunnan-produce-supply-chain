import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id") || "";
  const db = getDb();
  if (productId) {
    const rows = db.prepare("SELECT * FROM videos WHERE product_id = ? ORDER BY created_at DESC").all(Number(productId));
    return NextResponse.json(rows);
  }
  const rows = db.prepare("SELECT * FROM videos ORDER BY created_at DESC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, url, platform, thumbnail, notes, product_id } = body;
  if (!title || !url) return NextResponse.json({ error: "标题和视频链接为必填项" }, { status: 400 });
  const db = getDb();
  const result = db.prepare("INSERT INTO videos (product_id, title, url, platform, thumbnail, notes) VALUES (?, ?, ?, ?, ?, ?)").run(product_id || 0, title, url, platform || "direct", thumbnail || "", notes || "");
  const row = db.prepare("SELECT * FROM videos WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
