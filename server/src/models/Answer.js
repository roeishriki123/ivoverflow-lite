import mongoose from "mongoose";

// Answer model: belongs to a question and has an author
const AnswerSchema = new mongoose.Schema(
  {
    body: { type: String, required: true, trim: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true },
      nickname: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Answer", AnswerSchema);
