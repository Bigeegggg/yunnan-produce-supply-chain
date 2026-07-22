import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const published = searchParams.get("published");

  let sql = "SELECT * FROM products WHERE 1=1";
  const params: (string | number)[] = [];

  if (search) { sql += " AND name LIKE ?"; params.push(`%${search}%`); }
  if (category) { sql += " AND category = ?"; params.push(category); }
  if (published !== null && published !== "") { sql += " AND published = ?"; params.push(Number(published)); }

  sql += " ORDER BY updated_at DESC";

  const db = getDb();
  const products = db.prepare(sql).all(...params);
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, name_en, category, origin, origin_en, season, spec, image, description, description_en, published } = body;
  if (!name || !category || !origin) {
    return NextResponse.json({ error: "名称、分类、产地为必填项" }, { status: 400 });
  }
  const db = getDb();
  const result = db.prepare(
    "INSERT INTO products (name, name_en, category, origin, origin_en, season, spec, image, description, description_en, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
  ).run(name, name_en || "", category, origin, origin_en || "", season || "", spec || "", image || "", description || "", description_en || "", published !== undefined ? (published ? 1 : 0) : 1);
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(result.lastInsertRowid);

  // Sync to JSON for Vercel deployment
  const allProducts = db.prepare("SELECT * FROM products ORDER BY id ASC").all();
  const dataDir = path.join(process.cwd(), "data");
  if (fs.existsSync(dataDir)) {
    fs.writeFileSync(path.join(dataDir, "products.json"), JSON.stringify(allProducts, null, 2), "utf-8");
  }

  return NextResponse.json(product, { status: 201 });
}
