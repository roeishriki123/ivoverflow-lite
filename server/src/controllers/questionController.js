// controllers/questionController.js
import Question from "../models/Question.js";

export async function createQuestion(req, res) {
  try {
    // נוודא שיש משתמש מזוהה (נובע מ-verifyToken שמכניס req.user.id)
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, body, tags } = req.body || {};
    if (!title || !body) {
      return res.status(400).json({ message: "title and body are required" });
    }

    const safeTags = Array.isArray(tags)
      ? tags.filter(t => typeof t === "string").map(t => t.trim()).filter(Boolean)
      : [];

    const q = await Question.create({
      title: String(title).trim(),
      body,
      tags: safeTags,
      authorId: req.user.id, 
    });

    const populated = await q.populate("authorId", "nickname fullName email");
    return res.status(201).json(populated);
  } catch (e) {
    console.error("createQuestion error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getQuestions(_req, res) {
  try {
    const list = await Question.find({}, "title body tags authorId createdAt")
      .sort({ createdAt: -1 })
      .populate("authorId", "nickname fullName email") // ← כדי לקבל פרטי יוצר השאלה
      .lean();

    return res.json(list);
  } catch (e) {
    console.error("getQuestions error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}
