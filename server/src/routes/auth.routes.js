import { Router } from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = Router();

// login route: checks email/password and returns JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const emailStr = String(email ?? "").trim();
    const passStr  = String(password ?? "").trim();

    if (!emailStr || !passStr) {
      return res.status(400).json({ error: "email & password required" });
    }

    const user = await User.findOne({ email: emailStr });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const candidateHash = crypto.createHash("sha512").update(passStr, "utf8").digest("hex");
    if (candidateHash !== user.passwordHash) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { sub: user._id.toString(), email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
    );

    res.json({ token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Login failed" });
  }
});


export default router;
