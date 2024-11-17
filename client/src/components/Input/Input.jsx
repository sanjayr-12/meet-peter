import axios from "axios";
import "./input.css";
import useStore from "../../store/zustand";
import { useState } from "react";

export const Input = () => {
  const setRender = useStore((state) => state.setRender);
  const [input, setInput] = useState("");
  const [condition, setCondition] = useState(false);
  const setLoading = useStore((state) => state.setLoading);
  const api_url = useStore((state) => state.api_url);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData(e.target);
      const message = formdata.get("input");
      setInput("");
      setCondition(true);
      if (message.trim() === "") {
        return;
      }
      setLoading(true);
      await axios.post(
        api_url + "/api/chats",
        { message },
        { withCredentials: true }
      );
      setRender();
    } catch (error) {
      console.log(error);
    } finally {
      setCondition(false);
    }
  };
  return (
    <div className="input-main-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          placeholder="send a message..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <input
          type="submit"
          value={condition ? "..." : "send"}
          disabled={condition}
          required
        />
      </form>
    </div>
  );
};
