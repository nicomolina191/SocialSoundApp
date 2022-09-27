import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/";
import LoadingProtectRoute from "./LoadingProtectRoute";

const ProtectedRoute = ({ children }) => {
  //const dispatch = useDispatch()
  const { userFirebase, loading } = useAuth();
 /*const pleasures = useSelector(state => state.usersgustos de musica del usuario )*/

/*   useEffect(()=> {
  dispatch()
  },[]) */

  if(loading) return <LoadingProtectRoute/>

  if (!userFirebase) return <Navigate to="/login" />;

//  if(pleasures.length < 1) return <Navigate to="/user/pleasures" />

  return <div>{children}</div>;
};

export default ProtectedRoute;
