import axios from "axios";
import useStore from "../../store/zustand";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./nav.css";
const Nav = () => {
  const user = useStore((state) => state.user);
  const setToken = useStore((state) => state.setToken);
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
  function toSentanceCase(str) {
    if (str) {
      return str.replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      );
    }
  }
  return (
    <div className="nav-main-contianer">
      <h3>Meet Peter</h3>
      <div className="nav-contianer">
        <h3>{user ? toSentanceCase(user?.name) : "Loading..."}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;
