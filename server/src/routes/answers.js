// routes for answers (protected by JWT in index.js)
import { Router } from "express";
import { createAnswer, getAnswersForQuestion } from "../controllers/answerController.js";

const router = Router();

// add a new answer
router.post("/answer", createAnswer);


// get all answers for a question (expects ?questionId=...)
router.get("/getQuestionAnswers", (req, res, next) => {
    req.params.questionId = req.query.questionId;
    return getAnswersForQuestion(req, res, next);
  });

export default router;
