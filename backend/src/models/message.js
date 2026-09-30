import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        meeting: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Meeting",
            required: [true, "Meeting is required"]
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Sender is required"]
        },
        content: {
            type: String,
            required: [true, "Message content is required"],
            trim: true,
            minlength: [1, "Message cannot be empty"],
            maxlength: [1000, "Message cannot exceed 1000 characters"]
        }
    },
    {
        timestamps: true
    }
);

messageSchema.index({
    meeting: 1,
    createdAt: 1
});

const Message = mongoose.model("Message", messageSchema);

export default Message;