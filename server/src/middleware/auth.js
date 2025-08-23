import jwt from "jsonwebtoken";

// middleware to check JWT in Authorization header
export function verifyToken(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.sub }; // attach user id from token
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
