import Question from "../models/Question.js";

// create a new question
export async function createQuestion(req, res) {
  try {
    if (!req.user?.id) return res.status(401).json({ message: "Unauthorized" });

    const { title, body, tags } = req.body || {};

    const titleStr = String(title ?? "").trim();
    const bodyStr  = String(body  ?? "").trim();
    if (!titleStr || !bodyStr) {
      return res.status(400).json({ message: "title and body are required" });
    }

    const safeTags = Array.isArray(tags)
      ? tags.filter(t => typeof t === "string").map(t => t.trim()).filter(Boolean)
      : [];

    const q = await Question.create({
      title: titleStr,
      body: bodyStr,
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

// get list of all questions
export async function getQuestions(_req, res) {
  try {
    const list = await Question.find({}, "title body tags authorId createdAt")
      .sort({ createdAt: -1 })
      .populate("authorId", "nickname fullName email") 
      .lean();

    return res.json(list);
  } catch (e) {
    console.error("getQuestions error:", e);
    return res.status(500).json({ message: "Server error" });
  }
}
