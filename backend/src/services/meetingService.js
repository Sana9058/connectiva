import crypto from "node:crypto";
import Meeting from "../models/meeting.js";
import Participant from "../models/participant.js";

const generateRoomId = () => {
    return crypto.randomBytes(12).toString("hex");
};

const createMeeting = async ({ title, userId }) => {
    const roomId = generateRoomId();

    const meeting = await Meeting.create({
        roomId,
        title,
        host: userId
    });

    return meeting;
};

const getUserMeetings = async (userId) => {
    const meetings = await Meeting.find({
        host: userId
    }).sort({
        createdAt: -1
    });

    return meetings;
};

const getMeetingByRoomId = async (roomId) => {
    const meeting = await Meeting.findOne({
        roomId
    });

    return meeting;
};

const joinMeeting = async ({ roomId, userId }) => {
    const meeting = await Meeting.findOne({
        roomId
    });

    if (!meeting) {
        const error = new Error("Meeting not found");
        error.statusCode = 404;
        throw error;
    }

    if (meeting.status === "ended") {
        const error = new Error("Meeting has already ended");
        error.statusCode = 400;
        throw error;
    }

    const existingParticipant = await Participant.findOne({
        meeting: meeting._id,
        user: userId
    });

    if (existingParticipant && !existingParticipant.leftAt) {
        return {
            meeting,
            participant: existingParticipant
        };
    }

    const participantCount = await Participant.countDocuments({
        meeting: meeting._id,
        leftAt: null
    });

    if (participantCount >= 4) {
        const error = new Error("Meeting is full");
        error.statusCode = 400;
        throw error;
    }

    const participant = await Participant.create({
        meeting: meeting._id,
        user: userId,
        joinedAt: new Date(),
        leftAt: null
    });

    if (meeting.status === "scheduled") {
        meeting.status = "active";
        meeting.startedAt = new Date();
        await meeting.save();
    }

    return {
        meeting,
        participant
    };
};

export default {
    createMeeting,
    getUserMeetings,
    getMeetingByRoomId,
    joinMeeting
};