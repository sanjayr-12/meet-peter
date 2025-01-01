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

  useEffect(() => {
    async function getAll() {
      try {
        const response = await axios.get("/api/chats/", {
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
    <div className="pt-20 pb-20">
      <div className="chat chat-start">
        <div className="chat-bubble">Hey buddy...</div>
      </div>
      {data.length > 0 &&
        data.map((chat, index) => {
          return (
            <div key={chat._id} className="chat-main-container">
              <div className="chat chat-end">
                <div className="chat-bubble">{chat.messages.user}</div>
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble">{chat.messages.ai}</div>
              </div>
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
