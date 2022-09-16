import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Explore from "./components/Explore";
import { AuthProvider } from "./context";
import ProtectedRoute from "./context/ProtectedRoute";
import "./App.css";
import Landing from "./components/landing/Landing";
import Post from "./components/post/Post";
function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedRoute></ProtectedRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/explore" element={<Explore />} />
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  );
}
export default App;
