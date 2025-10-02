import express from "express";
import { selfRequest } from "../../controllers/common/self.controller.js";

const router = express.Router();

router.get("/", selfRequest);

export default router;
