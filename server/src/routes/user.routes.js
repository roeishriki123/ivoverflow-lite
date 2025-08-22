import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// GET /api/userInfo (מוגן)
router.get("/userInfo", verifyToken, async (req, res) => {
  try {
    res.json({
      id: req.user.id,
      email: req.user.email,
      nickname: req.user.nickname,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
});

export default router;
