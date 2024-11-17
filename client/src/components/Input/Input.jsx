import axios from "axios";
import "./input.css";

export const Input = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const message = formdata.get("input");
      const response = await axios.post(
        "/api/chats",
        { message },
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="input-main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <input type="text" name="input" placeholder="send a message..." />
        <input type="submit" value="send" />
      </form>
    </div>
  );
};
