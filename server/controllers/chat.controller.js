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

export const getAll = async (req, res) => {
  try {
    const id = req.user.id;
    const chatData = await chatModel.find({ userId: id });
    return res.status(200).json(chatData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};

export const deleteChats = async (req, res) => {
  try {
    const id = req.user.id;
    const response = await chatModel.deleteMany({ userId: id });
    if (!response) {
      return res
        .status(400)
        .json({ error: "message something went wrong while deleting" });
    }
    return res.status(200).json({ message: "Messages deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { url, name } = req.body;
    const urlReg = /\.(jpeg|jpg|gif|png|webp)$/i;
    const checkUrl = urlReg.test(url);

    if (!checkUrl) {
      return res.status(400).json({ error: "Image url is invalid" });
    }

    const updateUser = await userModel.findByIdAndUpdate(id, {
      picture: url,
      name,
    });
    if (!updateUser) {
      return res.status(400).json({ error: "Error in updating" });
    }
    return res.status(200).json({ message: "Profile Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};
