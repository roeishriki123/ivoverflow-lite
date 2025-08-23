import mongoose from "mongoose";

// User model: basic info + password hash
const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // SHA512
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
