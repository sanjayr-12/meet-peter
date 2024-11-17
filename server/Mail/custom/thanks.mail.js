import model from "../../Gemini/gemini.config.js";
import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function ThankMail(mail) {
  try {
    const content = await model.generateContent(process.env.THANK_PROMPT);

    transporter.sendMail({
      from: {
        name: "Peter Griffen",
        address: process.env.USER,
      },
      to: mail,
      subject: "Hey Thank you!!",
      text: content.response.text(),
      html: content.response.text(),
    });
    console.log("thank mail sended");
  } catch (error) {
    console.log("Failed to send thank mail");
    throw error;
  }
}
