import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM supplier_contacts ORDER BY name ASC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, phone, notes } = body;
  if (!name || !phone) return NextResponse.json({ error: "名称和电话为必填项" }, { status: 400 });
  const db = getDb();
  const result = db.prepare("INSERT INTO supplier_contacts (name, phone, notes) VALUES (?, ?, ?)").run(name, phone, notes || "");
  const row = db.prepare("SELECT * FROM supplier_contacts WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
