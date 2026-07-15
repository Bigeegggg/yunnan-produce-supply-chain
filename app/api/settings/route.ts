import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
  const settings: Record<string, string> = {};
  for (const row of rows) { settings[row.key] = row.value; }
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const db = getDb();
  const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now'))");
  const tx = db.transaction(() => {
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === "string") upsert.run(key, value);
    }
  });
  tx();
  return NextResponse.json({ success: true });
}
