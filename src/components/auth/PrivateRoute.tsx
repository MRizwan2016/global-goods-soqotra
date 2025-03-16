
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface PrivateRouteProps {
  children?: ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const { isAuthenticated, isAdmin, currentUser } = useAuth();

  useEffect(() => {
    console.log("PrivateRoute: Authentication status", { 
      isAuthenticated, 
      isAdmin, 
      currentUser: currentUser ? `${currentUser.fullName} (${currentUser.email})` : 'none'
    });
  }, [isAuthenticated, isAdmin, currentUser]);

  // Check if user is authenticated
  if (!isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/admin/login" replace />;
  }

  // Check if admin is required for the route
  if (requireAdmin && !isAdmin) {
    console.log("Admin access required but user is not admin, redirecting to home");
    toast({
      title: "Access Denied",
      description: "You do not have permission to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }

  // Render children
  return <>{children}</>;
};

export default PrivateRoute;
