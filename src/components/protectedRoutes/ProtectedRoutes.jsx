import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({
  user,
  redirectTo = "/login",
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};