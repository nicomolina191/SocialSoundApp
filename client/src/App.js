import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Explore from "./components/Explore/Explore";
import { AuthProvider } from "./context";
import "./App.css";
import Landing from "./components/landing/Landing";
import Home from "./components/home/Home";
import ProtectedRoute from "./context/ProtectedRoute";
import SupportForm from "./components/supportForm/SupportForm";
import Sucess from "./components/sucess/Sucess";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Admin from "./components/admin/Admin";
//import Upload from "./components/Upload/Upload";
//  import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <Routes>
           <Route path="/sucess" element={<Sucess />}/>
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
                <Explore />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home/explore/:id"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
           <Route path="/support" element={
              <ProtectedRoute>
           <SupportForm />
           </ProtectedRoute>
           }/>
           <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
           <Route path="*" element={<ProtectedRoute><Navigate to="/login"/></ProtectedRoute>} />
        
        </Routes>
      </AuthProvider>
    </React.StrictMode>
  );
}
export default App;
