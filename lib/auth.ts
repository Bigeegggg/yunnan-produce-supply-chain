import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "";
export const JWT_SECRET = process.env.JWT_SECRET || "fallback-dev-secret";

export function verifyPassword(password: string): boolean {
  if (!PASSWORD_HASH) return false;
  return bcrypt.compareSync(password, PASSWORD_HASH);
}

export function signToken(): string {
  return jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
}

export function verifyToken(token: string): { valid: boolean } {
  try {
    jwt.verify(token, JWT_SECRET);
    return { valid: true };
  } catch {
    return { valid: false };
  }
}
