import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    messages: {
      user: {
        type: String,
      },
      ai: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("chats", chatSchema);

export default chatModel;
