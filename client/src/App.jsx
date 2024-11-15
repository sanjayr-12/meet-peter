import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Verify from "./utils/Verify";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Verify />}>
          <Route path="/chat" element={<Chat />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
