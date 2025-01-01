import express from "express";
import { config as configDotenv } from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import selfRequest from "./routes/common/self.routes.js"

configDotenv();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../client/dist")));

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
app.use("/self",selfRequest)

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(3000, () => {
  console.log("server is started");
  connectDB();
});
