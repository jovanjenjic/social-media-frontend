import Home from "./pages/home/Home";
// import { Person } from "@material-ui/icons";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  Navigate
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes >
        <Route path="/" element={user ? <Home/> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> :<Register/>} />
        <Route path="/messenger" element={!user ? <Navigate to="/" /> :<Messenger/>} />
        <Route path="/profile/:username" element={<Profile/>} />
      </Routes >
    </Router>
  );
}

export default App;
