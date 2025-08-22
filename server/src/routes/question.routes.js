// routes/question.routes.js
import { Router } from "express";
import { createQuestion, getQuestions } from "../controllers/questionController.js";

const router = Router();

router.post("/createQuestion", createQuestion);
router.get("/getQuestions", getQuestions);

export default router;
