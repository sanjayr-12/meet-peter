import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: process.env.ORIGIN, credentials: true, exposedHeaders: ["Set-cookie"] }));

app.use("/api/user", authRoutes);
app.use("/api/chats", chatRoutes);

app.listen(3000, () => {
  console.log("server is started");
  connectDB();
});
