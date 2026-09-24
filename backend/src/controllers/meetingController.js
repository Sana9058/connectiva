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

const getUserMeetings = async (req, res) => {
    try {
        const meetings = await meetingService.getUserMeetings(
            req.user.userId
        );

        return res.status(200).json({
            success: true,
            meetings
        });
    } catch (error) {
        console.error("Get user meetings error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch meetings"
        });
    }
};

const getMeetingByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;

        const meeting = await meetingService.getMeetingByRoomId(roomId);

        if (!meeting) {
            return res.status(404).json({
                success: false,
                message: "Meeting not found"
            });
        }

        return res.status(200).json({
            success: true,
            meeting
        });
    } catch (error) {
        console.error("Get meeting error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch meeting"
        });
    }
};

const joinMeeting = async (req, res) => {
    try {
        const { roomId } = req.params;

        const result = await meetingService.joinMeeting({
            roomId,
            userId: req.user.userId
        });

        return res.status(200).json({
            success: true,
            message: "Joined meeting successfully",
            meeting: result.meeting,
            participant: result.participant
        });
    } catch (error) {
        console.error("Join meeting error:", error);

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode
                ? error.message
                : "Failed to join meeting"
        });
    }
};

export {
    createMeeting,
    getUserMeetings,
    getMeetingByRoomId,
    joinMeeting
};