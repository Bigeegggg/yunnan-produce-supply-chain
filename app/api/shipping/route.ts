import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM shipping_methods ORDER BY name ASC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, type, contact, notes } = body;
  if (!name) return NextResponse.json({ error: "名称为必填项" }, { status: 400 });
  const db = getDb();
  const result = db.prepare("INSERT INTO shipping_methods (name, type, contact, notes) VALUES (?, ?, ?, ?)").run(name, type || "", contact || "", notes || "");
  const row = db.prepare("SELECT * FROM shipping_methods WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
