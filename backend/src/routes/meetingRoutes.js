import express from "express";
import { createMeeting } from "../controllers/meetingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMeeting);

export default router;