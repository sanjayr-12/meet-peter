import axios from "axios";
import useStore from "../../store/zustand";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
const Nav = () => {
  const user = useStore((state) => state.user);
  const setToken = useStore((state) => state.setToken);
  const setRender = useStore((state) => state.setRender);
  const naviagte = useNavigate();
  const modelRef = useRef<HTMLDialogElement>(null);
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

  const handleOpenModel = () => {
    if (modelRef.current) {
      modelRef.current.showModal();
    }
  };

  const handleDelete = async () => {
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
  };

  const handleProfile = () => {
    naviagte("/profile");
  };

  return (
    <div className="navbar bg-base-100 flex fixed max-w-[500px] z-50">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Meet Peter</a>
      </div>
      <div className="menu menu-horizontal px-1 gap-3">
        <button onClick={handleOpenModel} disabled={deleteLoading}>
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>

        {/* Model open */}

        <dialog id="my_modal_1" className="modal" ref={modelRef}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <p className="py-4">
              Aw man, all our chat history is gonna be gone... just like my
              hopes of ever fitting into those old jeans.
            </p>
            <div className="modal-action">
              <form method="dialog" className="flex gap-3">
                <button className="btn">Close</button>
                <button className="btn btn-error" onClick={handleDelete}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Model close */}

        <div className="flex flex-row gap-3">
          <img
            src={user?.picture}
            alt="profile"
            className="w-8 rounded-full cursor-pointer"
            onClick={handleProfile}
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
