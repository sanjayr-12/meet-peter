import axios from "axios";

export async function checkImage(url) {
  try {
    await axios.get(url);
    return true;
  } catch (error) {
    return false;
  }
}
