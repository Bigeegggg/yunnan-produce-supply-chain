import { NextResponse } from "next/server";
import { verifyPassword, signToken } from "@/lib/auth";

// Simple in-memory rate limiter
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

function getIP(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export async function POST(request: Request) {
  const ip = getIP(request);
  const now = Date.now();
  const attempt = loginAttempts.get(ip);

  // Check lockout
  if (attempt && attempt.count >= MAX_ATTEMPTS && now < attempt.resetAt) {
    const remaining = Math.ceil((attempt.resetAt - now) / 60000);
    return NextResponse.json({ error: `登录尝试过多，请 ${remaining} 分钟后重试` }, { status: 429 });
  }

  // Reset if lockout expired
  if (attempt && now >= attempt.resetAt) {
    loginAttempts.delete(ip);
  }

  const { password } = await request.json();

  if (!password || !verifyPassword(password)) {
    // Record failed attempt
    const current = loginAttempts.get(ip) || { count: 0, resetAt: now + LOCKOUT_MINUTES * 60000 };
    current.count++;
    loginAttempts.set(ip, current);
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }

  // Success — clear attempts
  loginAttempts.delete(ip);

  const token = signToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  return response;
}
