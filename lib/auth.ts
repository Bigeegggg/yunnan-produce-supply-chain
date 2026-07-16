import { createHash } from "crypto";
import jwt from "jsonwebtoken";

// 用 SHA256 替代 bcrypt，避免 $ 符号转义问题
const PASSWORD_SHA = "10385b8c927e80442cd3048f8b217b1e6407f44ed9219335d9f321fb17a90208";

function getJwtSecret(): string {
  return process.env.JWT_SECRET || "yunnan-produce-admin-jwt-secret-2026";
}

export function verifyPassword(password: string): boolean {
  const hash = createHash("sha256").update(password).digest("hex");
  return hash === PASSWORD_SHA;
}

export function signToken(): string {
  return jwt.sign({ role: "admin" }, getJwtSecret(), { expiresIn: "24h" });
}

export function verifyToken(token: string): { valid: boolean } {
  try {
    jwt.verify(token, getJwtSecret());
    return { valid: true };
  } catch {
    return { valid: false };
  }
}
