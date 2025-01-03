import { useEffect, useState, useRef } from "react";
import "./display.css";
import axios from "axios";
import useStore from "../../store/zustand";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import ChatProfile from "./ChatProfile";

const Display = () => {
  const render = useStore((state) => state.render);
  const [data, setData] = useState([]);
  const chatEndRef = useRef(null);
  const setLoading = useStore((state) => state.setLoading);
  const loading = useStore((state) => state.loading);
  const url = "https://i.ibb.co/0YQMmyB/icon-1.png";
  const user = useStore((state) => state.user);

  useEffect(() => {
    async function getAll() {
      try {
        const response = await axios.get("/api/chats/", {
          withCredentials: true,
        });
        setData(response.data);
      } catch (error) {
        toast.error(error.response.data.error);
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
      <Toaster />
      <div className="chat chat-start">
        <ChatProfile img={url} />
        <div className="chat-bubble">Hey buddy...</div>
      </div>
      {data.length > 0 &&
        data.map((chat, index) => {
          return (
            <div key={chat._id} className="chat-main-container">
              <div className="chat chat-end">
                {console.log(user.picture)}
                <div className="chat-bubble">{chat.messages.user}</div>
              </div>
              <div className="chat chat-start">
                <ChatProfile img={url} />
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
