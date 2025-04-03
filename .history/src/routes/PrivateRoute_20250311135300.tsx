import React from "react";
import { useAuth } from "../hooks/useAuth"; // Hook giả định để lấy trạng thái đăng nhập
import { Navigate } from "@react-navigation/native";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

export default function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteProps) {
  const { isAuthenticated } = useAuth(); // Giả định bạn có hook này

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to={{ screen: "Login" }} />
  );
}
