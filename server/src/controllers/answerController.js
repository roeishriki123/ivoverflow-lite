// controllers/answerController.js
import mongoose from "mongoose";
import Answer from "../models/Answer.js";
import Question from "../models/Question.js";
import User from "../models/User.js";

export async function createAnswer(req, res) {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { body, questionId } = req.body || {};
    if (!body || !questionId) {
      return res.status(400).json({ message: "body and questionId are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ message: "Invalid questionId" });
    }

    // נוודא שהשאלה קיימת
    const question = await Question.findById(questionId).lean();
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // נביא כינוי למשתמש כדי למלא את השדה המוטמע author
    const user = await User.findById(req.user.id, "nickname").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const text = String(body).trim();
    if (!text) {
      return res.status(400).json({ message: "body must not be empty" });
    }

    const ans = await Answer.create({
      body: text,
      questionId,
      author: { _id: req.user.id, nickname: user.nickname },
    });

    return res.status(201).json(ans);
  } catch (err) {
    console.error("createAnswer error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getAnswersForQuestion(req, res) {
  try {
    const { questionId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({ message: "Invalid questionId" });
    }

    const answers = await Answer.find({ questionId })
      .sort({ createdAt: 1 }) // מהישנות לחדשות
      .lean();

    return res.json(answers);
  } catch (err) {
    console.error("getAnswersForQuestion error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
