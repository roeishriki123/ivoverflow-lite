import jwt from "jsonwebtoken";
import { hashPassword } from "../utils/crypto.js";
import User from "../models/User.js";


// handle login: check credentials and return JWT
export async function login(req, res) {
  try {
    const { email, password } = req.body || {};

    const emailStr = String(email ?? "").trim();
    const passStr  = String(password ?? "").trim();

    if (!emailStr || !passStr) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const user = await User.findOne({ email: emailStr }).lean();
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordHash = hashPassword(passStr);
    if (passwordHash !== user.passwordHash) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
    const token = jwt.sign(
      {},
      process.env.JWT_SECRET,
      { expiresIn, subject: String(user._id) }
    );

    return res.json({
      token,
      expiresIn,
      user: {
        id: user._id,
        nickname: user.nickname,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
