import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const verifyMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({ error: "Not authorized" });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res
        .status(404)
        .json({ error: "Unauthorized, verification fails" });
    }

    const user = await userModel.findById(verify.id);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};

export default verifyMe;
