import axios from "axios";

export async function checkImage(url) {
  try {
    if (!url || typeof url !== "string") {
      return false;
    }

    const response = await axios.head(url);
    const contentType = response.headers["content-type"];

    const isImage = contentType && contentType.startsWith("image/");

    return isImage && response.status === 200;
  } catch (error) {
    return false;
  }
}
