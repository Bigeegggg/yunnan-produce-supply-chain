import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("product_id") || "";

  if (!productId) {
    return NextResponse.redirect(new URL("/trace", request.url));
  }

  const db = getDb();
  const batches = db.prepare("SELECT batch_code FROM trace_batches WHERE product_id = ? AND status = 'active' ORDER BY created_at DESC").all(Number(productId)) as { batch_code: string }[];

  if (batches.length === 0) {
    return NextResponse.redirect(new URL("/trace", request.url));
  } else if (batches.length === 1) {
    return NextResponse.redirect(new URL(`/trace/${batches[0].batch_code}`, request.url));
  } else {
    return NextResponse.redirect(new URL(`/trace?product_id=${productId}`, request.url));
  }
}
