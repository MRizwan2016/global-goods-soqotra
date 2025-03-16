
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface PrivateRouteProps {
  children?: ReactNode;
  requireAdmin?: boolean;
  requiredFile?: keyof ReturnType<typeof useAuth>['currentUser']['permissions']['files'];
}

const PrivateRoute = ({ children, requireAdmin = false, requiredFile }: PrivateRouteProps) => {
  const { isAuthenticated, isAdmin, currentUser, hasFilePermission } = useAuth();

  useEffect(() => {
    console.log("PrivateRoute: Authentication status", { 
      isAuthenticated, 
      isAdmin, 
      currentUser: currentUser ? `${currentUser.fullName} (${currentUser.email})` : 'none',
      requiredFile
    });
  }, [isAuthenticated, isAdmin, currentUser, requiredFile]);

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

  // Check if specific file permission is required
  if (requiredFile && !isAdmin && !hasFilePermission(currentUser, requiredFile)) {
    console.log(`File permission ${requiredFile} required but user doesn't have access, redirecting to home`);
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
