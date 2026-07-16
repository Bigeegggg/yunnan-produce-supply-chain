import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = getDb();
  const existing = db.prepare("SELECT * FROM supplier_contacts WHERE id = ?").get(Number(id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const name = body.name ?? (existing as any).name;
  const phone = body.phone ?? (existing as any).phone;
  const notes = body.notes ?? (existing as any).notes;
  const cooperation_record = body.cooperation_record ?? (existing as any).cooperation_record;
  db.prepare("UPDATE supplier_contacts SET name=?, phone=?, notes=?, cooperation_record=? WHERE id=?").run(name, phone, notes, cooperation_record, Number(id));
  const updated = db.prepare("SELECT * FROM supplier_contacts WHERE id = ?").get(Number(id));
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  db.prepare("DELETE FROM supplier_contacts WHERE id = ?").run(Number(id));
  return NextResponse.json({ success: true });
}
