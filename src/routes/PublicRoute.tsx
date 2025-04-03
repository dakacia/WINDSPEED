// import React from "react";
// import { useAuth } from "../hooks/useAuth";

// interface PublicRouteProps {
//   component: React.ComponentType<any>;
//   restricted?: boolean; // Route chỉ dành cho chưa đăng nhập
//   [key: string]: any;
// }

// export default function PublicRoute({
//   component: Component,
//   restricted = false,
//   ...rest
// }: PublicRouteProps) {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated && restricted ? (
//     <Navigate to={{ screen: "Home" }} />
//   ) : (
//     <Component {...rest} />
//   );
// }
