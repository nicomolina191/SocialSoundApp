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
import SupportForm from "./components/supportForm/SupportForm";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
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
          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                {" "}
                <Upload />
              </ProtectedRoute>} />
          <Route
            path="/support"
            element={<SupportForm />} />
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  );
}
export default App;
{
  /*           
                   <Route path="/home" element={<Home />} />
          <Route path="/home/explore" element={<Explore />} />
          <Route path="/upload" element={<Upload />} />
          /> */
}
