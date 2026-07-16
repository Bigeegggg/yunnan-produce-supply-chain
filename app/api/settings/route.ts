import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import fs from "fs";
import path from "path";

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

  // Sync advantages to JSON for Vercel deployment
  const updatedSettings = db.prepare("SELECT key, value FROM settings").all() as { key: string; value: string }[];
  const settingsMap: Record<string, string> = {};
  for (const row of updatedSettings) { settingsMap[row.key] = row.value; }
  const advantages = [
    { title: settingsMap.advantage_1_title || "源头种植", description: settingsMap.advantage_1_desc || "", icon: "🌱" },
    { title: settingsMap.advantage_2_title || "冷链直发", description: settingsMap.advantage_2_desc || "", icon: "🚛" },
    { title: settingsMap.advantage_3_title || "品控溯源", description: settingsMap.advantage_3_desc || "", icon: "✅" },
  ];
  const dataDir = path.join(process.cwd(), "data");
  if (fs.existsSync(dataDir)) {
    fs.writeFileSync(path.join(dataDir, "advantages.json"), JSON.stringify(advantages, null, 2), "utf-8");
  }

  return NextResponse.json({ success: true });
}
