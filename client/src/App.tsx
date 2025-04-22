import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Verify from "./utils/Verify";
import Chats from "./pages/chats/Chats";
import MagicLink from "./pages/magic/MagicLink";
import Page404 from "./pages/404/Page404";

const App = () => {
  return (
    <div className="bg-base-200 min-h-screen max-w-[500px] mr-auto ml-auto">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Verify />}>
          <Route path="/" element={<Chats />} />
        </Route>
        <Route path="/magic" element={<MagicLink />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};

export default App;
