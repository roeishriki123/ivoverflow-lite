// routes/answers.js
import { Router } from "express";
import { createAnswer, getAnswersForQuestion } from "../controllers/answerController.js";

const router = Router();

// POST /api/answer   
router.post("/answer", createAnswer);

// GET  /api/answers/:questionId 
router.get("/answers/:questionId", getAnswersForQuestion);

export default router;
