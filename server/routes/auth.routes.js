import express from "express";
import { login } from "../controllers/auth.controller.js";
import verifyMe from "../utils/verify.js";

const router = express.Router();

router.post("/login", login);
router.get("/verify",verifyMe)

export default router;
