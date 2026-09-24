import crypto from "node:crypto";
import Meeting from "../models/meeting.js";

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

export default {
    createMeeting,
    getUserMeetings,
    getMeetingByRoomId
};