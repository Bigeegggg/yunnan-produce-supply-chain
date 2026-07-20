import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM videos ORDER BY created_at DESC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, url, platform, thumbnail, notes } = body;
  if (!title || !url) return NextResponse.json({ error: "标题和视频链接为必填项" }, { status: 400 });
  const db = getDb();
  const result = db.prepare("INSERT INTO videos (title, url, platform, thumbnail, notes) VALUES (?, ?, ?, ?, ?)").run(title, url, platform || "direct", thumbnail || "", notes || "");
  const row = db.prepare("SELECT * FROM videos WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
