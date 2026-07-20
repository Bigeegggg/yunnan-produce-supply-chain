import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export default function proxy(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) return NextResponse.next();
  if (request.nextUrl.pathname === "/api/auth/login") return NextResponse.next();
  if (request.nextUrl.pathname === "/api/inquiries" && request.method === "POST") return NextResponse.next();
  if (request.nextUrl.pathname.startsWith("/api/trace") && request.method === "GET") return NextResponse.next();
  if (request.nextUrl.pathname === "/api/videos" && (request.method === "GET" || request.method === "POST")) return NextResponse.next();

  const token = request.cookies.get("admin_token")?.value;
  if (!token || !verifyToken(token).valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
