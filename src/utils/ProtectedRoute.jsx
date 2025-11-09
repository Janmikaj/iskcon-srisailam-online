import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // No token → not logged in → redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // If role restricted and doesn’t match → go home
  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
