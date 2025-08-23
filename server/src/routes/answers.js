// routes/answers.js
import { Router } from "express";
import { createAnswer, getAnswersForQuestion } from "../controllers/answerController.js";

const router = Router();

// POST /api/answer   
router.post("/answer", createAnswer);


//  GET /api/getQuestionAnswers?questionId=...

router.get("/getQuestionAnswers", (req, res, next) => {
    req.params.questionId = req.query.questionId;
    return getAnswersForQuestion(req, res, next);
  });

export default router;
