import cluster from "cluster";
import os from "os";
import express from "express";
import { config as configDotenv } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import selfRequest from "./routes/common/self.routes.js";
import { reStart } from "./cron/cron.js";
import rateLimit from "express-rate-limit";

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const numCPUs = os.availableParallelism();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();

  app.set("trust proxy", true);

  app.use(express.json());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.use(limiter);

  app.use(
    cors({
      origin: process.env.ORIGIN,
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
      ],
      credentials: true,
    })
  );

  app.use("/api/user", authRoutes);
  app.use("/api/chats", chatRoutes);
  app.use("/api/self", selfRequest);

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} running on port 3000`);
    reStart();
    connectDB();
  });
}
