import { useEffect, useState, useRef } from "react";
import "./display.css";
import axios from "axios";
import useStore from "../../store/zustand";

const Display = () => {
  const render = useStore((state) => state.render);
  const [data, setData] = useState([]);
  const chatEndRef = useRef(null);
  const setLoading = useStore((state) => state.setLoading);
  const loading = useStore((state) => state.loading);
  const api_url = useStore((state) => state.api_url);

  useEffect(() => {
    async function getAll() {
      try {
        const response = await axios.get(api_url + "/api/chats/", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, loading]);

  return (
    <div className="display-main-container">
      {data.length > 0 &&
        data.map((chat, index) => {
          return (
            <div key={chat._id} className="chat-main-container">
              <p className="user">{chat.messages.user}</p>
              <p className="ai">{chat.messages.ai}</p>
              {index === data.length - 1 && loading && (
                <span>Peter is Typing...</span>
              )}
            </div>
          );
        })}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Display;
