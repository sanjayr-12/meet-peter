import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MagicLink = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    if (email?.toString().trim() === "") {
      return;
    }
    try {
      await axios.post("/api/user/magic", { email });
      setLoad(true);
      toast.success("check in your mail buddy");
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoad(false);
        toast.error(error?.response?.data?.error);
      }
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Toaster />
      {load ? (
        <div>
          <h1 className="text-xl text-center">
            Hey there! Check your mail for the magic link. It’s gonna expire in
            5 minutes and it’s a one-time deal, ya know? If you don’t see the
            link
            <br />
            <button onClick={() => setLoad(false)} className="btn btn-link">
              <h1 className="text-xl">Just enter your email again!</h1>
            </button>
          </h1>
        </div>
      ) : (
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSumbit}
        >
          <h1 className="text-xl text-center">Continue with Magic link</h1>
          <br />
          <label className="input input-bordered flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
            />
          </label>
          <br />
          <input type="submit" className="btn btn-ghost" />
        </form>
      )}
      <br />
      <button className="btn btn-outline" onClick={() => navigate("/")}>
        Cancel
      </button>
    </div>
  );
};

export default MagicLink;
