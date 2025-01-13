import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStore from "../store/zustand";

const Verify = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  const naviagte = useNavigate();

  useEffect(() => {
    async function verify() {
      try {
        setLoading(true);
        const response = await axios.get("/api/user/verify", {
          withCredentials: true,
        });
        setUser(response.data.data);
        setLoading(false);
        naviagte("/chat");
      } catch (error) {
        naviagte("/");
        setUser(null);
        console.log(error);
      }
    }
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  return <div>{user && <Outlet />}</div>;
};

export default Verify;
