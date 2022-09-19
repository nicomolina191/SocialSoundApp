import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Explore from "./components/Explore/Explore";
import { AuthProvider } from "./context";
import "./App.css";
import Upload from "./components/Upload/Upload";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import ProtectedRoute from "./context/ProtectedRoute";
import SideBar from "./components/SideBar/SideBar";
import ResetPassword from "./components/resetPassword/ResetPassword";


function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/explore"
            element={
              <ProtectedRoute>
                <Explore />{" "}
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  );
}
export default App;
