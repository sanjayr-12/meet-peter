import verifyCredential from "../google/verifyCredential.js";
import generateToken from "../jwt/generateToken.js";
import userModel from "../models/userModel.js";

export const login = async (req, res) => {
  try {
    const { token } = req.body;
    const response = await verifyCredential(token);
    if (!response.email_verified) {
      return response.status(404).json({ error: "Email is not verified" });
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
    generateToken(newUser._id, res);
    res.status(200).json({ message: "Signed in", newUser });
  } catch (error) {
    res.status(500).json({ error: "Internal server errord " + error.message });
  }
};
