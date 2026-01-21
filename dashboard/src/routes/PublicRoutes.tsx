import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = Cookies.get("token");

  // If already logged in → redirect to dashboard ("/")
  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
