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

export default {
    createMeeting
};