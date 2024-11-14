import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();

const verifyCredential = async (token) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default verifyCredential;
