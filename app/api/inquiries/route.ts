import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// Rate limiter for public submissions
const inquiryRateMap = new Map<string, { count: number; resetAt: number }>();
const INQUIRY_MAX = 3; // max 3 submissions
const INQUIRY_WINDOW = 60 * 60 * 1000; // per hour

function getIP(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function GET() {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM inquiries ORDER BY created_at DESC").all();
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const ip = getIP(request);
  const now = Date.now();
  const rate = inquiryRateMap.get(ip);
  if (rate && rate.count >= INQUIRY_MAX && now < rate.resetAt) {
    return NextResponse.json({ error: "提交过于频繁，请稍后再试" }, { status: 429 });
  }
  if (!rate || now >= rate.resetAt) {
    inquiryRateMap.set(ip, { count: 1, resetAt: now + INQUIRY_WINDOW });
  } else {
    rate.count++;
  }

  const body = await request.json();
  const { product_name, customer_name, phone, quantity, notes } = body;
  if (!customer_name || !phone) {
    return NextResponse.json({ error: "称呼和联系方式为必填项" }, { status: 400 });
  }
  const db = getDb();
  const result = db.prepare(
    "INSERT INTO inquiries (product_name, customer_name, phone, quantity, notes) VALUES (?, ?, ?, ?, ?)"
  ).run(product_name || "", customer_name, phone, quantity || "", notes || "");
  const row = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(row, { status: 201 });
}
