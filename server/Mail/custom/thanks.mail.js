import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function ThankMail(mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Thanks for Signing Up, Pal! Let's Chat!",
      text: `Hey there! Thanks for signing up to chat with me, Peter Griffin! This is gonna be a blast. Start chatting and let's have some fun! See ya soon, pal!`,
      html: `
  <p>Hey there!</p>
  <p>Thanks for signing up to chat with me, <b>Peter Griffin</b>! This is gonna be a blast.</p>
  <p>Start chatting and let's have some fun! See ya soon, pal!</p>
`,
    });
    console.log("thank mail sended");
  } catch (error) {
    console.log("Failed to send thank mail");
    throw error;
  }
}
