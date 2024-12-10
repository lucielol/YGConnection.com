import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Atau sesuaikan dengan logika auth Anda

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
