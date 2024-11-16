import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const protectedRoute = async (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      return res.status(404).json({ error: "Not authorized" });
    }
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    if (!verify) {
      return res
        .status(404)
        .json({ error: "Unautorized token verification fails" });
    }
    const user = await userModel.findById(verify.id);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal sever error " + error.message });
  }
};
