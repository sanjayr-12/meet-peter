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
          src="https://i.ibb.co/xMXzvBg/peter.jpg"
          className="max-w-sm rounded-lg shadow-2xl max-h-72"
        />
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-5xl font-bold">Hey There, You!</h2>
          <p className="py-6 text-center">
            Oh, look who showed up! It’s you! Alright, alright, here’s the
            deal—this is your chance to chat with me, Peter Griffin! You got
            jokes? Questions? Wanna just shoot the breeze? I’m here for it, pal!
            So stop stalling, click that login button below, and let’s yap it
            up. C’mon, don’t leave me hanging!
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
