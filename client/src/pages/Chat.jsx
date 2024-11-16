import axios from "axios";
import useStore from "../store/zustand";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const user = useStore((state) => state.user);
  const setToken = useStore((state) => state.setToken);
  const token = useStore((state) => state.token);
  const naviagte = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      naviagte("/");
      googleLogout();
      setToken(null);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(token);
  return (
    <div>
      <h3>{user ? user?.name : "Loading..."}</h3>
      <img src={user?.picture} />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Chat;
