import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import ChatPage from "./ChatPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chat/easy" element={<ChatPage persona="Easy to Handle" />} />
      <Route path="/chat/hard" element={<ChatPage persona="Hard to Work With" />} />
    </Routes>
  );
};

export default App;
