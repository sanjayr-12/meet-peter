import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function verify() {
      const response = await axios.post("http://localhost:3000/test", {
        token,
      });
      console.log(response.data);
    }
    if (token) {
      verify();
    }
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

export default App;
