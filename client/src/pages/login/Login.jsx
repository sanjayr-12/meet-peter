import { GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import axios from "axios";
import useStore from "../../store/zustand";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  useEffect(() => {
    async function verify() {
      try {
        const response = await axios.post(
          "/api/user/login",
          {
            token,
          }
        );
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
    <div className="main-login-container">
      <h1>Login</h1>
      <GoogleLogin
        onSuccess={(response) => {
          setToken(response.credential);
        }}
        onError={(err) => console.log(err)}
        useOneTap={true}
        text={"continue_with"}
        shape={"circle"}
      />
    </div>
  );
};

export default Login;
