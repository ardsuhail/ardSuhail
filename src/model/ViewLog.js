import mongoose from "mongoose";

const ViewLogSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    viewedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Compound index for faster lookups
ViewLogSchema.index({ projectId: 1, ip: 1 }, { unique: true });
ViewLogSchema.index({ viewedAt: 1 }, { expireAfterSeconds: 86400 }); // Auto delete after 24 hours

export default mongoose.models.ViewLog || mongoose.model("ViewLog", ViewLogSchema);