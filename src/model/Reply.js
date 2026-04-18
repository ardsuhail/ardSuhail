// model/Reply.js
import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
    queryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Queries',
        required: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    userName: {
        type: String,
        required: true
    },
    replyMessage: {
        type: String,
        required: true,
        trim: true
    },
    replySubject: {
        type: String,
        default: "Reply to your query"
    },
    repliedBy: {
        type: String,
        default: "Admin"
    }
}, {
    timestamps: true
});

// Index
ReplySchema.index({ queryId: 1, createdAt: -1 });

export default mongoose.models.Reply || mongoose.model("Reply", ReplySchema);