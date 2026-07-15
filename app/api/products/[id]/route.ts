import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id));
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const db = getDb();
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const name = body.name ?? (existing as any).name;
  const category = body.category ?? (existing as any).category;
  const origin = body.origin ?? (existing as any).origin;
  const season = body.season ?? (existing as any).season;
  const spec = body.spec ?? (existing as any).spec;
  const image = body.image ?? (existing as any).image;
  const description = body.description ?? (existing as any).description;
  const published = body.published !== undefined ? (body.published ? 1 : 0) : (existing as any).published;

  db.prepare(
    "UPDATE products SET name=?, category=?, origin=?, season=?, spec=?, image=?, description=?, published=?, updated_at=datetime('now') WHERE id=?"
  ).run(name, category, origin, season, spec, image, description, published, Number(id));

  const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id));
  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.prepare("DELETE FROM products WHERE id = ?").run(Number(id));
  return NextResponse.json({ success: true });
}
