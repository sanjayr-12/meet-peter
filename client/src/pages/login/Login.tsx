import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import useStore from "../../store/zustand";
import { useNavigate } from "react-router-dom";
import { State } from "../../store/types";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const token = useStore((state: State) => state.token);
  const setToken = useStore((state: State) => state.setToken);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [loaded, setLoaded] = useState(true);

  useEffect(() => {
    async function verify() {
      try {
        const response = await axios.post("/api/user/login", {
          token,
        });
        setUser(response.data.data);
        navigate("/");
      } catch (error) {
        setToken(null);
        setUser(null);
        navigate("/login");
        if (error instanceof AxiosError) {
          toast.error(
            error?.response?.data === ""
              ? "Server is Down"
              : error?.response?.data?.error
          );
        }
      }
    }
    if (token) {
      verify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleMagic = () => {
    navigate("/magic");
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col items-center justify-center">
        {!loaded && <div className="skeleton w-[14rem] h-72"></div>}
        <img
          src="https://i.ibb.co/xMXzvBg/peter.jpg"
          alt="chat avatar"
          className="max-w-sm rounded-lg shadow-2xl max-h-72"
          onLoad={handleImageLoad}
          style={loaded ? {} : { display: "none" }}
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
          <br />
          <GoogleLogin
            onSuccess={(response) => {
              setToken(response?.credential ?? null);
            }}
            text={"continue_with"}
            shape={"circle"}
          />
          <br />
          <button className="btn btn-ghost" onClick={handleMagic}>
            Continue with Email
          </button>
          <br />
          <a
            href="https://omgpeter.tech"
            className="btn btn-primary mx-auto text-lg"
          >
            <button>Subscribe to NewsLetter</button>
          </a>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
