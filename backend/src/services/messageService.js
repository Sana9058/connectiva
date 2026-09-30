import Message from "../models/message.js";
import Meeting from "../models/meeting.js";
import Participant from "../models/participant.js";

const createMessage = async ({
    roomId,
    userId,
    content
}) => {
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
        user: userId,
        leftAt: null
    });

    const isHost =
        meeting.host.toString() === userId.toString();

    if (!participant && !isHost) {
        const error = new Error(
            "You are not an active participant in this meeting"
        );
        error.statusCode = 403;
        throw error;
    }

    const message = await Message.create({
        meeting: meeting._id,
        sender: userId,
        content: content.trim()
    });

    await message.populate("sender", "name email");

    return message;
};

const getMeetingMessages = async ({
    roomId,
    userId
}) => {
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

    const participant = await Participant.findOne({
        meeting: meeting._id,
        user: userId
    });

    if (!isHost && !participant) {
        const error = new Error(
            "You are not authorized to view this meeting chat"
        );
        error.statusCode = 403;
        throw error;
    }

    const messages = await Message.find({
        meeting: meeting._id
    })
        .populate("sender", "name email")
        .sort({
            createdAt: 1
        });

    return messages;
};

export default {
    createMessage,
    getMeetingMessages
};