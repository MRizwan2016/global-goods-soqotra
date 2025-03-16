
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children?: ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  // Check if admin is required for the route
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
