import cron from "node-cron";
import { configDotenv } from "dotenv";
configDotenv();
import axios from "axios";

const url = process.env.ORIGIN;

export const reStart = () => {
  cron.schedule(
    "*/14 * * * *",
    async () => {
      await axios.get(`${url}/api/self`);
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};
