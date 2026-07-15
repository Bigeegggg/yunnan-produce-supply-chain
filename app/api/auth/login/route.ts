import { NextResponse } from "next/server";
import { verifyPassword, signToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { password } = await request.json();
  if (!password || !verifyPassword(password)) {
    return NextResponse.json({ error: "密码错误" }, { status: 401 });
  }
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
