import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthorize } from "../../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuthorize();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
