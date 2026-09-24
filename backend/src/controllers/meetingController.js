import meetingService from "../services/meetingService.js";

const createMeeting = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Meeting title is required"
            });
        }

        const meeting = await meetingService.createMeeting({
            title: title.trim(),
            userId: req.user.userId
        });

        return res.status(201).json({
            success: true,
            message: "Meeting created successfully",
            meeting
        });
    } catch (error) {
        console.error("Create meeting error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create meeting"
        });
    }
};

export {
    createMeeting
};