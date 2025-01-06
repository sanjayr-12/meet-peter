import express from "express";
import { login, logout, magicLink } from "../controllers/auth.controller.js";
import verifyMe from "../utils/verify.js";
import { protectedRoute } from "../utils/protectedRoutes.js";

const router = express.Router();

router.post("/login", login);
router.get("/verify", verifyMe);
router.post("/logout", protectedRoute, logout);
router.post("/magic", magicLink);
router.get("/magic", verifyMagic);

export default router;
