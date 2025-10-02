import axios from "axios";
import useStore from "../../store/zustand";
import { useState, useRef } from "react";
import LogoutModel from "../display/LogoutModel";
import Profile from "../../pages/profile/Profile";
const Nav = () => {
  const user = useStore((state) => state.user);
  const setRender = useStore((state) => state.setRender);
  const modelRef = useRef<HTMLDialogElement>(null);
  const logoutModelRef = useRef<HTMLDialogElement>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleLogout = async () => {
    if (logoutModelRef.current) {
      logoutModelRef.current.showModal();
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

        <dialog id="my_model_1" className="modal" ref={modelRef}>
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
            onClick={() =>
              (
                document.getElementById("profile-model") as HTMLDialogElement
              )?.showModal()
            }
          />

          <button onClick={handleLogout}>Logout</button>

          {/* This is opening of logout model bruhh */}
          <LogoutModel model={logoutModelRef} />
          {/* Closing of logout model bruhh.. */}
        </div>
      </div>
      <Profile />
    </div>
  );
};

export default Nav;
