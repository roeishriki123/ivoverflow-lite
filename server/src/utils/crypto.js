import crypto from "crypto";

// helper to hash a password string with SHA-512
export function hashPassword(password) {
  return crypto.createHash("sha512").update(password).digest("hex");
}
