import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/";
import LoadingProtectRoute from "./LoadingProtectRoute";
import Pleasures from "../components/userGenresPleasures/Pleasures"

const ProtectedRoute = ({ children }) => {
  const { userFirebase, loading } = useAuth();
  const pleasures = useSelector(state => state.users.currentUser.genres)

  if(loading) return <LoadingProtectRoute/>

  if (!userFirebase) return <Navigate to="/login" />;

  if(pleasures?.length < 1) return <Pleasures />

  return <div>{children}</div>;
};

export default ProtectedRoute;
