import cron from "node-cron";
import { configDotenv } from "dotenv";
configDotenv();
import axios from "axios";

const url = process.env.ORIGIN;

export const reStart = () => {
  cron.schedule(
    "*/14 * * * *",
    async () => {
      const response = await axios.get(`${url}/api/self`);
      console.log(response.data);
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};
