import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/db.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/auth/user", authRoutes);

app.listen(3000, () => {
  console.log("server is started");
  connectDB();
});
