import axios from "axios";
import useStore from "../../store/zustand";
import { useState } from "react";

export const Input = () => {
  const setRender = useStore((state) => state.setRender);
  const [input, setInput] = useState("");
  const [condition, setCondition] = useState(false);
  const setLoading = useStore((state) => state.setLoading);
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
      await axios.post("/api/chats", { message }, { withCredentials: true });
      setRender();
    } catch (error) {
      console.log(error);
    } finally {
      setCondition(false);
    }
  };
  return (
    <div className="bottom-0 right-0 flex left-0 justify-center p-3 navbar bg-base-100 fixed max-w-[500px] z-50 mr-auto ml-auto">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center gap-5"
      >
        <input
          type="text"
          name="input"
          placeholder="send a message..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <input
          type="submit"
          value={condition ? "..." : "send"}
          disabled={condition}
          className="cursor-pointer"
          required
        />
      </form>
    </div>
  );
};
