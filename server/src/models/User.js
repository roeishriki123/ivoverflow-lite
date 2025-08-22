import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // סיסמה מוצפנת ב-SHA512
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
