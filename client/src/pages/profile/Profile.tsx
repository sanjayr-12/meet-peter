import axios, { AxiosError } from "axios";
import useStore from "../../store/zustand";
import toast, { Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [load, setLoad] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const url = formData.get("url")?.toString().trim() ?? user?.picture;
      const name = formData.get("name")?.toString().trim() ?? user?.name;

      const response = await axios.patch(
        "api/chats/update",
        { url, name },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleDeleteClick = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleDelete = async () => {
    try {
      setLoad(true);
      const response = await axios.delete("/api/chats/delete", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong bro...");
      }
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10 max-w-[500px]">
      <Toaster />
      <h1 className="text-center text-xl">Update Profile</h1>
      <form className="flex flex-col gap-9" onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2 p-6">
          Image Url
          <input
            name="url"
            type="text"
            className="grow"
            placeholder="https://some.com/chicken.png"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input
            type="text"
            className="grow"
            placeholder={user?.name}
            name="name"
          />
        </label>
        <input type="submit" className="btn btn-ghost" value="Update" />
      </form>
      <button className="btn btn-error" onClick={handleDeleteClick}>
        Delete account
      </button>

      {/* Model bro... */}
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Account</h3>
          <p className="py-4">
            Are you sure you want to delete your account? All your chat
            histories and account details will be deleted. This action cannot be
            undone
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
            <button className="btn btn-error" onClick={handleDelete} disabled={load}>
              {load?"Deleting...":"Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Profile;
