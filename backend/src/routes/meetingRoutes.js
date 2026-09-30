import express from "express";
import {
    createMeeting,
    getUserMeetings,
    getMeetingHistory,
    getMeetingByRoomId,
    getMeetingParticipants,
    joinMeeting,
    leaveMeeting,
    endMeeting,
    removeParticipant
} from "../controllers/meetingController.js";
import {
    createMessage,
    getMeetingMessages
} from "../controllers/messageController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createMeeting);
router.get("/", authMiddleware, getUserMeetings);
router.get("/history", authMiddleware, getMeetingHistory);
router.get("/:roomId/participants", authMiddleware, getMeetingParticipants);
router.post("/:roomId/messages", authMiddleware, createMessage);
router.get("/:roomId/messages", authMiddleware, getMeetingMessages);
router.get("/:roomId", authMiddleware, getMeetingByRoomId);
router.post("/:roomId/join", authMiddleware, joinMeeting);
router.post("/:roomId/leave", authMiddleware, leaveMeeting);
router.post("/:roomId/participants/:participantId/remove", authMiddleware, removeParticipant);
router.post("/:roomId/end", authMiddleware, endMeeting);

export default router;