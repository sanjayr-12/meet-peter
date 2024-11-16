import verifyCredential from "../google/verifyCredential.js";
import generateToken from "../jwt/generateToken.js";
import { ThankMail } from "../Mail/custom/thanks.mail.js";
import userModel from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const response = await verifyCredential(token);
    if (!response.email_verified) {
      return res.status(404).json({ error: "Email is not verified" });
    }
    const existingUser = await userModel.findOne({ email: response.email });
    if (existingUser) {
      generateToken(existingUser._id, res);
      return res.status(200).json({ message: "Signed in", data: existingUser });
    }

    const newUser = new userModel({
      email: response.email,
      name: response.name,
      picture: response.picture,
    });
    await newUser.save();
    ThankMail(newUser.email);
    generateToken(newUser._id, res);
    return res.status(200).json({ message: "Signed in", newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server error " + error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};
