import User from "../models/User.js";

export async function getUserInfo(req, res) {
  try {
    const user = await User.findById(req.user.id).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      id: user._id,
      nickname: user.nickname,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (err) {
    console.error("getUserInfo error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
