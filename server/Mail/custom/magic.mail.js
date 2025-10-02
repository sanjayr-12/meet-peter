import { transporter } from "../config/mail.config.js";
import { configDotenv } from "dotenv";
configDotenv();

export async function MagicMail(token, mail) {
  try {
    transporter.sendMail({
      from: {
        name: "Peter Griffin",
        address: process.env.USER,
      },
      to: mail,
      subject: "Magic Link buddy",
      html: `<p>Hey there! Here's your one-time use Magic Link, and it will expire after 5 minutes. Use it wisely!</p>
             <a href="${process.env.ORIGIN}/api/user/magic?auth=${token}" target="_blank">Magic Link</a>`,
    });
  } catch (error) {
    throw error;
  }
}
