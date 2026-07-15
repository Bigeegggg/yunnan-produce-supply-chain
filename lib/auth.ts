import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Read from .admin-hash file
export const PASSWORD_HASH = "$2b$10$whhB2vACGeaPWv9ui8cvseI6ypr2WQc5V6kB.7hrxX1tW1rlg0qva";

export const JWT_SECRET = "yunnan-produce-admin-jwt-secret-2026";

export function verifyPassword(password: string): boolean {
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
