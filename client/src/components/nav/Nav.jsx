import axios from "axios";
import useStore from "../../store/zustand";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./nav.css";
import { useState } from "react";
const Nav = () => {
  const user = useStore((state) => state.user);
  const setToken = useStore((state) => state.setToken);
  const setRender = useStore((state) => state.setRender);
  const naviagte = useNavigate();
  const [deleteLoading, setDeleteLoading] = useState(false);
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
  const handleDelete = async () => {
    const command = prompt(
      "Type DELETE, if you want to delete your chat history, with no spaces"
    );
    if (command === "DELETE") {
      try {
        setDeleteLoading(true);
        await axios.delete("/api/chats/delete", {
          withCredentials: true,
        });
        setRender();
      } catch (error) {
        console.log(error);
      } finally {
        setDeleteLoading(false);
      }
    } else {
      alert("Wrong Command, make sure to have no spaces");
    }
  };
  return (
    <div className="nav-main-container">
      <h3>Meet Peter</h3>
      <button onClick={handleDelete} className="delete" disabled={deleteLoading}>
        {deleteLoading?"deleting...":"delete"}
      </button>
      <div className="nav-container">
        <h3>{user ? toSentanceCase(user?.name) : "Loading..."}</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Nav;
