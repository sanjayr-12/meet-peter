import cron from "node-cron";
import { configDotenv } from "dotenv";
configDotenv();
import axios from "axios";

const url = process.env.ORIGIN;

export const reStart = () => {
  cron.schedule(
    "*/14 * * * *",
    async () => {
      const response = await axios.get(`${url}/self`);
      console.log(response.data.message);
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};
