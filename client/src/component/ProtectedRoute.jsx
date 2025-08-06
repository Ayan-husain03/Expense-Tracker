import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <Loader />;
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
