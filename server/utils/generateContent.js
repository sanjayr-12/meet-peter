import model from "../Gemini/gemini.config.js";
import chatModel from "../models/chatModel.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function GenerateContent(prompt, userId) {
  try {
    const history = await chatModel.find({ userId }).select("messages");
    const summary = await model.generateContent(
      process.env.UTIL_TEXT2 + " " + history
    );

    const result = await model.generateContent(
      process.env.UTIL_TEXT + " " + summary.response.text() + " " + prompt
    );
    return result.response.text();
  } catch (error) {
    throw error;
  }
}
