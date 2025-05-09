import { useEffect, useState, useRef } from "react";
import axios, { AxiosError } from "axios";
import useStore from "../../store/zustand";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Chat } from "../../store/types";

const Display = () => {
  const render = useStore((state) => state.render);
  const [data, setData] = useState<Chat[]>([]);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
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
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.error);
        }
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
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "instant",
      });
    }
  }, [data, loading]);

  return (
    <div className="pt-20 pb-20">
      <Toaster />
      <div className="chat chat-start">
        <div className="chat-bubble">Hey buddy...</div>
      </div>
      {loading && data.length === 0 && (
        <div className="ml-5 mt-4">
          <span className="loading loading-dots loading-xs"></span>
        </div>
      )}
      {data.length > 0 &&
        data.map((chat, index) => {
          return (
            <div key={chat._id} className="chat-main-container">
              <div className="chat chat-end">
                <div className="chat-bubble break-words max-w-[80%]">
                  {chat.messages.user}
                </div>
              </div>
              <div className="chat chat-start">
                <div className="chat-bubble max-w-[80%] break-words">
                  {chat.messages.ai}
                </div>
              </div>
              {index === data.length - 1 && loading && (
                <div className="ml-5 mt-4">
                  <span className="loading loading-dots loading-xs"></span>
                </div>
              )}
            </div>
          );
        })}

      <div ref={chatEndRef} />
    </div>
  );
};

export default Display;
