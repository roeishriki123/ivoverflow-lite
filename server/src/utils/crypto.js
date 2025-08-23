import crypto from "crypto";

// SHA512 conversion
export function hashPassword(password) {
  return crypto.createHash("sha512").update(password).digest("hex");
}
