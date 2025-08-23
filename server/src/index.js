import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { verifyToken } from "./middleware/auth.js";


import authRoutes from "./routes/auth.routes.js";   
import userRoutes from "./routes/user.routes.js";   
import questionRoutes from "./routes/question.routes.js";
import answersRouter from "./routes/answers.js";



dotenv.config();

const app = express();

// Middlewares
app.use(express.json());


// allow CORS from React dev server
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

// security headers
app.use(helmet());

// public routes (no auth)
app.get("/", (req, res) => res.send("IVOverflow Lite API is running 🚀"));
app.get("/api/health", (req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.use("/api", authRoutes); 

// everything after this requires JWT
app.use("/api", verifyToken);

// protected routes
app.use("/api", userRoutes); 
app.use("/api", questionRoutes);
app.use("/api", answersRouter);



// connect to DB and start server
const PORT = process.env.PORT || 4000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ivoverflow";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(" Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(` Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log(" Mongo connection closed");
  process.exit(0);
});
