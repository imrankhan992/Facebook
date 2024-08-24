import Login from "./pages/login";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NotLoggedIn from "./routes/NotLoggedIn";
import LoggedIn from "./routes/LoggedIn";
import Home from "./components/home/Index";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<LoggedIn />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route element={<NotLoggedIn />}>
          <Route path="/" element={<Home />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
