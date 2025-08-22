import crypto from "crypto";

// פונקציה להמרת סיסמה ל-SHA512
export function hashPassword(password) {
  return crypto.createHash("sha512").update(password).digest("hex");
}
