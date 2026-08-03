import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import AIComposer from "./pages/AIComposer";
import Schedular from "./pages/Schedular";
import Layout from "./components/Layout"; // ✅ your own Layout component

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>           {/* ✅ parent wrapper */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="schedular" element={<Schedular />} />  {/* ✅ no space */}
        <Route path="ai-composer" element={<AIComposer />} />
      </Route>
    </Routes>
  );
}

export default App;