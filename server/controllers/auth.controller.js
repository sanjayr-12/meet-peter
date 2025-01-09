import verifyCredential from "../google/verifyCredential.js";
import generateToken from "../jwt/generateToken.js";
import { MagicMail } from "../Mail/custom/magic.mail.js";
import { ThankMail } from "../Mail/custom/thanks.mail.js";
import BlackListModel from "../models/BlacklistModel.js";
import MagicModel from "../models/MagicModel.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

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

export const magicLink = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }

    const checkUser = await MagicModel.findOne({ email });

    if (checkUser) {
      const id = checkUser._id;
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "5m",
      });

      await MagicMail(token, email);

      return res.status(200).json({ message: "Check your mail" });
    }

    const newUser = new MagicModel({
      email,
    });
    await newUser.save();
    const id = newUser._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    await MagicMail(token, email);

    return res.status(200).json({ message: "Check your mail" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};

export const verifyMagic = async (req, res) => {
  try {
    const token = req.query.auth;

    if (!token) {
      return res.status(400).json({ error: "No auth token" });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return res.status(400).json({ error: "Unauthorized" });
    }

    const checkMagic = await MagicModel.findById(verify.id);

    if (!checkMagic) {
      return res.status(400).json({ error: "Email is not present" });
    }
    const blackList = await BlackListModel.findOne({ token });
    if (blackList) {
      return res.status(400).json({ error: "Link expired" });
    }
    const newToken = new BlackListModel({
      token,
    });
    await newToken.save();
    const checkUser = await userModel.findOne({ email: checkMagic.email });
    if (checkUser) {
      generateToken(checkUser._id, res);
      return res.redirect("/chat");
    }
    const name = checkMagic.email;
    const username = name.split("@")[0];
    const newUser = new userModel({
      name: username,
      email: checkMagic.email,
      picture: "https://i.ibb.co/Hp9dw6N/chicken.png",
    });
    await newUser.save();
    generateToken(newUser._id, res);
    ThankMail(newUser.email);
    res.redirect("/chat");
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Internal server error " + error.message });
  }
};
