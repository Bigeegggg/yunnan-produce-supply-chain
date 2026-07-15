import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/api")) return NextResponse.next();
  if (request.nextUrl.pathname === "/api/auth/login") return NextResponse.next();

  const token = request.cookies.get("admin_token")?.value;
  if (!token || !verifyToken(token).valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
