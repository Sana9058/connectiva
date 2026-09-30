import messageService from "../services/messageService.js";

const createMessage = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({
                success: false,
                message: "Message content is required"
            });
        }

        const message = await messageService.createMessage({
            roomId,
            userId: req.user.userId,
            content
        });

        return res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: message
        });
    } catch (error) {
        console.error("Create message error:", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to send message"
        });
    }
};

const getMeetingMessages = async (req, res) => {
    try {
        const { roomId } = req.params;

        const messages = await messageService.getMeetingMessages({
            roomId,
            userId: req.user.userId
        });

        return res.status(200).json({
            success: true,
            messages
        });
    } catch (error) {
        console.error("Get meeting messages error:", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to fetch meeting messages"
        });
    }
};

export {
    createMessage,
    getMeetingMessages
};