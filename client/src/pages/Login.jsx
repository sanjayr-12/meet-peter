import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";
import useStore from "../store/zustand";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    async function verify() {
      try {
        const response = await axios.post("/api/user/login", {
          token,
        });
        setUser(response.data);
        navigate("/chat");
      } catch (error) {
        setToken(null);
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
    <div>
      <GoogleLogin
        onSuccess={(response) => {
          setToken(response.credential);
        }}
      />
    </div>
  );
};

export default Login;
