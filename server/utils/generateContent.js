import model from "../Gemini/gemini.config.js";
import chatModel from "../models/chatModel.js";
import { configDotenv } from "dotenv";
import { chatHistory } from "./history.js";
configDotenv();

export async function GenerateContent(prompt, userId) {
  try {
    const history = await chatModel.find({ userId }).select("messages");
    
    const formattedHistory = chatHistory(history);

   const systemPrompt = {
     role: "model",
     parts: [{ text: process.env.UTIL_TEXT }],
   };

   const historyPrompt = {
     role: "model",
     parts: [{ text: process.env.UTIL_TEXT3 + " " + formattedHistory }],
   };

   const userPrompt = {
     role: "user",
     parts: [{ text: prompt }],
   };

    const messages = [systemPrompt, historyPrompt, userPrompt];
     const result = await model.generateContent({
       contents: messages,
     });
    return result.response.text();
  } catch (error) {
    console.log(error.message);
    
    throw error;
  }
}
