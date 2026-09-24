import express from "express";
import { createMeeting, getUserMeetings } from "../controllers/meetingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMeeting);
router.get("/", authMiddleware, getUserMeetings);

export default router;