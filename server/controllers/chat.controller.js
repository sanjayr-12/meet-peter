import chatModel from "../models/chatModel.js";
import userModel from "../models/userModel.js";
import { GenerateContent } from "../utils/generateContent.js";

export const newMessage = async (req, res) => {
  try {
    const id = req.user.id;
    const { message } = req.body;
    const response = await GenerateContent(message, id);

    const checkUser = await userModel.findById(id);
    if (!checkUser) {
      return res
        .status(400)
        .json({ error: "Something went wrong user not found" });
    }
    const chatData = {
      user: message,
      ai: response,
    };
    const newChatData = new chatModel({
      userId: id,
      messages: chatData,
    });
    await newChatData.save();
    return res.status(200).json(newChatData);
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};
