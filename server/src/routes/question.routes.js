// routes for creating and listing questions
import { Router } from "express";
import { createQuestion, getQuestions } from "../controllers/questionController.js";

const router = Router();

// create a new question
router.post("/createQuestion", createQuestion);

// get all questions
router.get("/getQuestions", getQuestions);

export default router;
