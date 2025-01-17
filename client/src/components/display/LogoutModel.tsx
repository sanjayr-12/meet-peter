import axios from "axios";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/zustand";
import { googleLogout } from "@react-oauth/google";

type LogoutModelProps = {
  model: React.RefObject<HTMLDialogElement>;
};

const LogoutModel: React.FC<LogoutModelProps> = ({ model }) => {
  const setToken = useStore((state) => state.setToken);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout", {}, { withCredentials: true });
      navigate("/");
      googleLogout();
      setToken(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <dialog id="my_model_1" className="modal" ref={model}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">You sure you wanna do this?</h3>
        <p className="py-4">
          Heh, you know what they say... once you log out, you can never go
          back! Just like that time I tried to fit into a pair of skinny jeans.
        </p>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            <button className="btn">Close</button>
            <button className="btn btn-error" onClick={handleLogout}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default LogoutModel;
