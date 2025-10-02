import axios, { AxiosError } from "axios";
import useStore from "../../store/zustand";
import toast, { Toaster } from "react-hot-toast";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { googleLogout } from "@react-oauth/google";

const Profile = () => {
  const user = useStore((state) => state.user);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);
  const [load, setLoad] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const setUser = useStore((state) => state.setUser);
  const setToken = useStore((state) => state.setToken);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setUpdateLoad(true);
      const formData = new FormData(e.currentTarget);
      let url = formData.get("url");
      let name = formData.get("name");

      if (url?.toString().trim() === "" && name?.toString().trim() === "") {
        return;
      }

      if (url?.toString().trim() === "") {
        url = user?.picture as FormDataEntryValue | null;
      }

      if (name?.toString().trim() === "") {
        name = user?.name as FormDataEntryValue | null;
      }

      const response = await axios.patch(
        "api/chats/update",
        { url, name },
        { withCredentials: true }
      );
      setUser(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setUpdateLoad(false);
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const handleDelete = async () => {
    try {
      setLoad(true);
      await axios.delete("/api/chats/deleteAccount", {
        withCredentials: true,
      });
      setUser(null);
      setToken(null);
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.error);
      } else {
        toast.error("Something went wrong bro...");
      }
      setLoad(false);
    } finally {
      setLoad(false);
    }
  };

  return (
    <dialog className="modal modal-bottom sm:modal-middle" id="profile-model">
      <div className="modal-box">
        <div className="flex justify-end">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </div>
        <div className="flex justify-center">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src={user?.picture} />
            </div>
          </div>
        </div>
        <br />
        <h1 className="text-center text-xl mb-6">Update Profile</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2">
            Img Url:
            <input
              name="url"
              type="text"
              className="grow"
              placeholder="https://some.com/chicken.png"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Name:
            <input
              type="text"
              className="grow"
              placeholder={user?.name}
              name="name"
            />
          </label>
          <div className="flex gap-4 justify-end mt-4">
            <button
              type="submit"
              className="btn btn-warning"
              disabled={updateLoad}
            >
              {updateLoad ? "updating..." : "update"}
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={handleDeleteClick}
            >
              Delete account
            </button>
          </div>
        </form>

        {/* Delete Confirmation Modal */}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Delete Account</h3>
            <p className="py-4">
              Are you sure you want to delete your account? All your chat
              histories and account details will be deleted. This action cannot
              be undone
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
              <button
                className="btn btn-error"
                onClick={handleDelete}
                disabled={load}
              >
                {load ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </dialog>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
      <Toaster />
    </dialog>
  );
};

export default Profile;
