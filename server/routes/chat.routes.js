import express from "express";
import { protectedRoute } from "../utils/protectedRoutes.js";
import {
  newMessage,
  getAll,
  deleteChats,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protectedRoute, newMessage);
router.get("/", protectedRoute, getAll);
router.delete("/delete", protectedRoute, deleteChats);

export default router;
