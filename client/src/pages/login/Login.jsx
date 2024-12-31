import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import axios from "axios";
import useStore from "../../store/zustand";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    async function verify() {
      try {
        const response = await axios.post("/api/user/login", {
          token,
        });
        setUser(response.data.data);
        navigate("/chat");
      } catch (error) {
        setToken(null);
        setUser(null);
        navigate("/");
        console.log(error);
      }
    }
    if (token) {
      verify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col items-center justify-center">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6 text-center">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae
          </p>
          <GoogleLogin
            onSuccess={(response) => {
              setToken(response.credential);
            }}
            onError={(err) => console.log(err)}
            text={"continue_with"}
            shape={"circle"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
