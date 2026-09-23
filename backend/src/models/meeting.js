import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
    {
        roomId: {
            type: String,
            required: [true, "Room ID is required"],
            unique: true,
            trim: true,
            index: true
        },

        title: {
            type: String,
            required: [true, "Meeting title is required"],
            trim: true,
            minlength: [3, "Meeting title must be at least 3 characters long"],
            maxlength: [100, "Meeting title cannot exceed 100 characters"]
        },

        host: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Meeting host is required"]
        },

        status: {
            type: String,
            enum: ["scheduled", "active", "ended"],
            default: "scheduled"
        },

        startedAt: {
            type: Date,
            default: null
        },

        endedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;