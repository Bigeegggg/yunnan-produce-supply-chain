import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = getDb();
  const existing = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(Number(id)) as any;
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const status = body.status ?? existing.status;
  const admin_notes = body.admin_notes ?? existing.admin_notes;

  db.prepare("UPDATE inquiries SET status=?, admin_notes=?, updated_at=datetime('now') WHERE id=?").run(status, admin_notes, Number(id));
  const updated = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(Number(id));
  return NextResponse.json(updated);
}
