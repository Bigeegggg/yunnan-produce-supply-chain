import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = getDb();
  const existing = db.prepare("SELECT * FROM shipping_methods WHERE id = ?").get(Number(id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const name = body.name ?? (existing as any).name;
  const type = body.type ?? (existing as any).type;
  const contact = body.contact ?? (existing as any).contact;
  const notes = body.notes ?? (existing as any).notes;
  db.prepare("UPDATE shipping_methods SET name=?, type=?, contact=?, notes=? WHERE id=?").run(name, type, contact, notes, Number(id));
  const updated = db.prepare("SELECT * FROM shipping_methods WHERE id = ?").get(Number(id));
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM shipping_methods WHERE id = ?").run(Number(id));
  return NextResponse.json({ success: true });
}
