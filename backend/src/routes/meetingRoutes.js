import express from "express";
import {
    createMeeting,
    getUserMeetings,
    getMeetingByRoomId
} from "../controllers/meetingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMeeting);
router.get("/", authMiddleware, getUserMeetings);
router.get("/:roomId", authMiddleware, getMeetingByRoomId);

export default router;