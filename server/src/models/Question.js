import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body:  { type: String, required: true },
    tags:  { type: [String], default: [] },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true } 
);



export default mongoose.model("Question", QuestionSchema);
