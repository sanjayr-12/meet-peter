import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/user", authRoutes);

app.listen(3000, () => {
  console.log("server is started");
  connectDB();
});
