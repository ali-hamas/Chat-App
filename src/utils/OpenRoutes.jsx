import React from "react";
import useAuth from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const OpenRoutes = () => {
  const { user } = useAuth();
  return !user ? <Outlet /> : <Navigate to={"/"} />;
};

export default OpenRoutes;
