// routes/answers.js
import { Router } from "express";
import { createAnswer, getAnswersForQuestion } from "../controllers/answerController.js";

const router = Router();

// POST /api/answer   – יצירת תשובה לשאלה
router.post("/answer", createAnswer);

// GET  /api/answers/:questionId – רשימת תשובות לשאלה
router.get("/answers/:questionId", getAnswersForQuestion);

export default router;
