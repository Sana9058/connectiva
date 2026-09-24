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

const getMeetingParticipants = async ({ roomId }) => {
    const meeting = await Meeting.findOne({
        roomId
    });

    if (!meeting) {
        const error = new Error("Meeting not found");
        error.statusCode = 404;
        throw error;
    }

    const participants = await Participant.find({
        meeting: meeting._id
    })
        .populate("user", "name email")
        .sort({
            joinedAt: 1
        });

    return {
        meeting,
        participants
    };
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

    // User is already inside the meeting
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

    let participant;

    // User previously joined and left.
    // Reuse the existing participant record.
    if (existingParticipant) {
        existingParticipant.joinedAt = new Date();
        existingParticipant.leftAt = null;

        participant = await existingParticipant.save();
    } else {
        participant = await Participant.create({
            meeting: meeting._id,
            user: userId,
            joinedAt: new Date(),
            leftAt: null
        });
    }

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

const leaveMeeting = async ({ roomId, userId }) => {
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

    const participant = await Participant.findOne({
        meeting: meeting._id,
        user: userId
    });

    if (!participant || participant.leftAt) {
        const error = new Error("User is not currently in the meeting");
        error.statusCode = 400;
        throw error;
    }

    participant.leftAt = new Date();

    await participant.save();

    return {
        meeting,
        participant
    };
};

const endMeeting = async ({ roomId, userId }) => {
    const meeting = await Meeting.findOne({
        roomId
    });

    if (!meeting) {
        const error = new Error("Meeting not found");
        error.statusCode = 404;
        throw error;
    }

    if (meeting.host.toString() !== userId.toString()) {
        const error = new Error("Only the meeting host can end the meeting");
        error.statusCode = 403;
        throw error;
    }

    if (meeting.status === "ended") {
        const error = new Error("Meeting has already ended");
        error.statusCode = 400;
        throw error;
    }

    const endedAt = new Date();

    meeting.status = "ended";
    meeting.endedAt = endedAt;

    await meeting.save();

    await Participant.updateMany(
        {
            meeting: meeting._id,
            leftAt: null
        },
        {
            leftAt: endedAt
        }
    );

    return meeting;
};

const authorizeMeetingAccess = async ({ roomId, userId }) => {
    const meeting = await Meeting.findOne({
        roomId
    });

    if (!meeting) {
        const error = new Error("Meeting not found");
        error.statusCode = 404;
        throw error;
    }

    const isHost =
        meeting.host.toString() === userId.toString();

    if (isHost) {
        return meeting;
    }

    const participant = await Participant.findOne({
        meeting: meeting._id,
        user: userId
    });

    if (!participant) {
        const error = new Error("You are not a participant in this meeting");
        error.statusCode = 403;
        throw error;
    }

    return meeting;
};

export default {
    createMeeting,
    getUserMeetings,
    getMeetingByRoomId,
    getMeetingParticipants,
    joinMeeting,
    leaveMeeting,
    endMeeting,
    authorizeMeetingAccess
};