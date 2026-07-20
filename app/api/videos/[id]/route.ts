import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = getDb();
  const existing = db.prepare("SELECT * FROM videos WHERE id = ?").get(Number(id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const title = body.title ?? (existing as any).title;
  const url = body.url ?? (existing as any).url;
  const platform = body.platform ?? (existing as any).platform;
  const thumbnail = body.thumbnail ?? (existing as any).thumbnail;
  const notes = body.notes ?? (existing as any).notes;
  const product_id = body.product_id ?? (existing as any).product_id;
  const status = body.status ?? (existing as any).status;

  db.prepare("UPDATE videos SET title=?, url=?, platform=?, thumbnail=?, notes=?, product_id=?, status=? WHERE id=?").run(title, url, platform, thumbnail, notes, product_id, status, Number(id));
  const updated = db.prepare("SELECT * FROM videos WHERE id = ?").get(Number(id));
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM videos WHERE id = ?").run(Number(id));
  return NextResponse.json({ success: true });
}
