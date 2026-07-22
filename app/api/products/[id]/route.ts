import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";

function syncProductsToJson() {
  const db = getDb();
  const all = db.prepare("SELECT * FROM products ORDER BY id ASC").all();
  const dataDir = path.join(process.cwd(), "data");
  if (fs.existsSync(dataDir)) {
    fs.writeFileSync(path.join(dataDir, "products.json"), JSON.stringify(all, null, 2), "utf-8");
  }
}

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
  const name_en = body.name_en ?? (existing as any).name_en ?? "";
  const category = body.category ?? (existing as any).category;
  const origin = body.origin ?? (existing as any).origin;
  const origin_en = body.origin_en ?? (existing as any).origin_en ?? "";
  const season = body.season ?? (existing as any).season;
  const spec = body.spec ?? (existing as any).spec;
  const image = body.image ?? (existing as any).image;
  const description = body.description ?? (existing as any).description;
  const description_en = body.description_en ?? (existing as any).description_en ?? "";
  const published = body.published !== undefined ? (body.published ? 1 : 0) : (existing as any).published;

  db.prepare(
    "UPDATE products SET name=?, name_en=?, category=?, origin=?, origin_en=?, season=?, spec=?, image=?, description=?, description_en=?, published=?, updated_at=datetime('now') WHERE id=?"
  ).run(name, name_en, category, origin, origin_en, season, spec, image, description, description_en, published, Number(id));

  const updated = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id));

  syncProductsToJson();

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const existing = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id));
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  db.prepare("DELETE FROM products WHERE id = ?").run(Number(id));

  syncProductsToJson();

  return NextResponse.json({ success: true });
}
