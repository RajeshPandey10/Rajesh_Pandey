import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { adminToken, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  // Redirect to home if not authenticated
  if (!adminToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
