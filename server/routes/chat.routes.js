import express from "express";
import { protectedRoute } from "../utils/protectedRoutes.js";
import { newMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protectedRoute, newMessage);

export default router;
