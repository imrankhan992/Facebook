import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "@tanstack/react-router";

const AuthRoute = ({ component: Component, requiresAuth = true }) => {
  const user = useSelector((state) => state.user);

  // Redirect to login if route requires authentication and user is not authenticated
  if (requiresAuth && !user) {
    return <Navigate to="/login" />;
  }

  // Redirect to home if user is logged in but trying to access login page
  if (!requiresAuth && user) {
    return <Navigate to="/" />;
  }
  // Render the component if the conditions are met
  return <Component />;
};

export default AuthRoute;
