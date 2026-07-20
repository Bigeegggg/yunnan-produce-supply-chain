import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = getDb();
  const existing = db.prepare("SELECT * FROM trace_batches WHERE id = ?").get(Number(id)) as any;
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const origin_info = body.origin_info ?? existing.origin_info;
  const production_info = body.production_info ?? existing.production_info;
  const testing_info = body.testing_info ?? existing.testing_info;
  const logistics_info = body.logistics_info ?? existing.logistics_info;
  const status = body.status ?? existing.status;

  db.prepare("UPDATE trace_batches SET origin_info=?, production_info=?, testing_info=?, logistics_info=?, status=?, updated_at=datetime('now') WHERE id=?").run(origin_info, production_info, testing_info, logistics_info, status, Number(id));
  const row = db.prepare("SELECT t.*, p.name as product_name FROM trace_batches t LEFT JOIN products p ON t.product_id = p.id WHERE t.id = ?").get(Number(id));
  return NextResponse.json(row);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM trace_batches WHERE id = ?").run(Number(id));
  return NextResponse.json({ success: true });
}
