import axios, { AxiosError } from "axios";
import useStore from "../../store/zustand";
import toast, { Toaster } from "react-hot-toast";

const Profile = () => {
  const user = useStore((state) => state.user);

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
    </div>
  );
};

export default Profile;
