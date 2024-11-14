import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client();

const verifyCredential = async (token) => {
  try {
    console.log("came");
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    throw error;
  }
};

export default verifyCredential;
