import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast, { Toaster } from "react-hot-toast";

const Goto = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      await axios.get("/api/user/verify", {
        withCredentials: true,
      });
      navigate("/chat");
    } catch (error) {
      navigate("/");
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.error + " " + "Login again");
      }
    }
  };

  return (
    <div>
      <button className="btn btn-neutral" onClick={handleClick}>
        Go to Chat
      </button>
      <Toaster />
    </div>
  );
};

export default Goto;
