import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Verify from "./utils/Verify";
import Chats from "./pages/chats/Chats";

const App = () => {
  return (
    <div className="bg-base-200 min-h-screen mr-auto ml-auto">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Verify />}>
          <Route path="/chat" element={<Chats />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
