import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true,
      trim: true,
    },
    replyMessage: {
      type: String,
      required: true,
      trim: true,
    },
    repliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Reply || mongoose.model("Reply", ReplySchema);
