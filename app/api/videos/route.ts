import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id") || "";
  const status = searchParams.get("status") || "";

  const db = getDb();
  let sql = "SELECT * FROM videos WHERE 1=1";
  const params: (string | number)[] = [];

  if (productId) { sql += " AND product_id = ?"; params.push(Number(productId)); }
  if (status && status !== "all") { sql += " AND status = ?"; params.push(status); }
  sql += " ORDER BY created_at DESC";

  const rows = db.prepare(sql).all(...params);
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, url, platform, thumbnail, notes, product_id, submitted_by } = body;
  if (!title || !url) return NextResponse.json({ error: "标题和视频链接为必填项" }, { status: 400 });

  const db = getDb();
  // Partner submissions default to pending
  const status = submitted_by ? "pending" : "approved";
  const result = db.prepare(
    "INSERT INTO videos (product_id, title, url, platform, thumbnail, notes, status, submitted_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(product_id || 0, title, url, platform || "direct", thumbnail || "", notes || "", status, submitted_by || "");

  const row = db.prepare("SELECT * FROM videos WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
