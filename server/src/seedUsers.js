import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import { hashPassword } from "./utils/crypto.js";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ivoverflow";

async function run() {
  console.log("🚀 Starting seed...");
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to", conn.connection.host, "db:", conn.connection.name);

    const del = await User.deleteMany({});
    console.log(`🗑 Cleared users (${del.deletedCount})`);

    const users = [
      { nickname: "roy",   fullName: "Roy Shriki",   email: "roy@example.com",   passwordHash: hashPassword("123456") },
      { nickname: "netta", fullName: "Netta Example", email: "netta@example.com", passwordHash: hashPassword("password") },
    ];
    const res = await User.insertMany(users);
    console.log(`✅ Users seeded: ${res.length}`);

    await mongoose.disconnect();
    console.log("🔌 Disconnected");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err);
    process.exit(1);
  }
}
run();
