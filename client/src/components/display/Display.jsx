import { useEffect, useState, useRef } from "react";
import "./display.css";
import axios from "axios";
import useStore from "../../store/zustand";

const Display = () => {
  const render = useStore((state) => state.render);
  const [data, setData] = useState([]);
  const chatEndRef = useRef(null); // Ref to target the bottom of the chat container

  useEffect(() => {
    async function getAll() {
      try {
        const response = await axios.get("/api/chats/", {
          withCredentials: true,
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAll();
  }, [render]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]); // Trigger scroll on data change (new messages)

  return (
    <div className="display-main-container">
      {data.length > 0 &&
        data.map((chat) => {
          return (
            <div key={chat._id} className="chat-main-container">
              <p className="user">{chat.messages.user}</p>
              <p className="ai">{chat.messages.ai}</p>
            </div>
          );
        })}
      {/* This empty div is used as a reference point to scroll to */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default Display;
