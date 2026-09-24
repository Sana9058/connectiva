import express from "express";
import {
    createMeeting,
    getUserMeetings,
    getMeetingByRoomId,
    joinMeeting,
    leaveMeeting,
    endMeeting
} from "../controllers/meetingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMeeting);
router.get("/", authMiddleware, getUserMeetings);
router.get("/:roomId", authMiddleware, getMeetingByRoomId);
router.post("/:roomId/join", authMiddleware, joinMeeting);
router.post("/:roomId/leave", authMiddleware, leaveMeeting);
router.post("/:roomId/end", authMiddleware, endMeeting);

export default router;