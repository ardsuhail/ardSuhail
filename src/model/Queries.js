// model/Queries.js
import mongoose from "mongoose";

const QueriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'replied', 'resolved'],
        default: 'pending'
    },
    isRead: {
        type: Boolean,
        default: false
    },
    repliedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

// Index for faster queries
QueriesSchema.index({ status: 1, createdAt: -1 });
QueriesSchema.index({ email: 1 });

export default mongoose.models.Queries || mongoose.model("Queries", QueriesSchema);