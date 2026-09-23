import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
    {
        meeting: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meeting",
            required: [true, "Meeting is required"]
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User is required"]
        },

        joinedAt: {
            type: Date,
            default: Date.now
        },

        leftAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

participantSchema.index(
    { meeting: 1, user: 1 },
    { unique: true }
);

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;