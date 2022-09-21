import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/";
import LoadingProtectRoute from "./LoadingProtectRoute";

const ProtectedRoute = ({ children }) => {
  const { userFirebase, loading } = useAuth();

  if(loading) return <LoadingProtectRoute/>

  if (!userFirebase) return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
