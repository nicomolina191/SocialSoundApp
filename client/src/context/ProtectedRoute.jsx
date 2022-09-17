import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/";

const ProtectedRoute = ({ children }) => {
  const { userFirebase } = useAuth();
  if (!userFirebase) return <Navigate to="/login" />;
  return <div>{children}</div>;
};

export default ProtectedRoute;
