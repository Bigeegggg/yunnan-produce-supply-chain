import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { product_name, customer_name, phone, quantity, notes } = body;
  if (!customer_name || !phone) {
    return NextResponse.json({ error: "称呼和联系方式为必填项" }, { status: 400 });
  }
  const db = getDb();
  const result = db.prepare(
    "INSERT INTO inquiries (product_name, customer_name, phone, quantity, notes) VALUES (?, ?, ?, ?, ?)"
  ).run(product_name || "", customer_name, phone, quantity || "", notes || "");
  const row = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
