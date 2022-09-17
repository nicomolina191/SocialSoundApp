import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Explore from "./components/Explore/Explore";
import { AuthProvider } from "./context";
import ProtectedRoute from "./context/ProtectedRoute";
import "./App.css";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import Pay from "./components/pay/Pay";
import Success from "./components/pay/Success";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/home' element={<Home/>}/>
          <Route path="/home/explore" element={<Explore />} />
          <Route path='/pay' element={<Pay />}/>
          <Route path='/success' element={<Success />}/>
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  );
}
export default App;
