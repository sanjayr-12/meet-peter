import express from "express";
import { protectedRoute } from "../utils/protectedRoutes.js";
import {
  newMessage,
  getAll,
  deleteChats,
  updateProfile,
  deleteAccount
} from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protectedRoute, newMessage);
router.get("/", protectedRoute, getAll);
router.delete("/delete", protectedRoute, deleteChats);
router.patch("/update", protectedRoute, updateProfile)
router.delete("/deleteAccount",protectedRoute, deleteAccount)

export default router;
