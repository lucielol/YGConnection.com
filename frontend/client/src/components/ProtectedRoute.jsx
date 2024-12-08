import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../services/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated || localStorage.getItem("token")
  );

  const isUser = useSelector(
    (state) =>
      state.auth.role === "user" || localStorage.getItem("role") === "user"
  );

  if (!isUser) {
    dispatch(logout());
  }

  if (!isAuthenticated || !isUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
