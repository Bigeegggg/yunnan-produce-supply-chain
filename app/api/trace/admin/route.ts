import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT t.*, p.name as product_name FROM trace_batches t LEFT JOIN products p ON t.product_id = p.id ORDER BY t.created_at DESC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { product_id, origin_info, production_info, testing_info, logistics_info } = body;
  if (!product_id) return NextResponse.json({ error: "请选择产品" }, { status: 400 });

  // Generate batch code: YN + YYMMDD + 4 random hex chars
  const date = new Date();
  const yymmdd = `${String(date.getFullYear()).slice(2)}${String(date.getMonth()+1).padStart(2,'0')}${String(date.getDate()).padStart(2,'0')}`;
  const random = Math.random().toString(36).substring(2,6).toUpperCase();
  const batchCode = `YN${yymmdd}${random}`;

  const db = getDb();
  db.prepare("INSERT INTO trace_batches (product_id, batch_code, origin_info, production_info, testing_info, logistics_info) VALUES (?, ?, ?, ?, ?, ?)").run(product_id, batchCode, origin_info || "", production_info || "", testing_info || "", logistics_info || "");
  const row = db.prepare("SELECT t.*, p.name as product_name FROM trace_batches t LEFT JOIN products p ON t.product_id = p.id WHERE t.batch_code = ?").get(batchCode);
  return NextResponse.json(row, { status: 201 });
}
