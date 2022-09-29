import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/";
import LoadingProtectRoute from "./LoadingProtectRoute";
import Pleasures from "../components/userGenresPleasures/Pleasures"
import Banned from "../components/banned/Banned";

const ProtectedRoute = ({ children }) => {
  const { userFirebase, loading, logout } = useAuth();
  const pleasures = useSelector(state => state?.users?.currentUser?.genres)
  const user = useSelector(state => state?.users?.currentUser)
  const urls = ['/admin', '/admin/users', '/admin/posts', '/admin/users/', '/admin/posts/']
  const {pathname} = useLocation()

  if(user?.isBanned === true && !loading) return <Banned user={user} />

  if(loading) return <LoadingProtectRoute/>

  if(!userFirebase) return <Navigate to="/login" />;

  if(pleasures?.length < 1) return <Pleasures />
  
  if(urls?.some(act => act === pathname) && user?.role !== "Admin" && !loading) return <Navigate to="/home" />


  return <div>{children}</div>;
};

export default ProtectedRoute;
