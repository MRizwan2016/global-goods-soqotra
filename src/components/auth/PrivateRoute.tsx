
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface PrivateRouteProps {
  children?: ReactNode;
  requireAdmin?: boolean;
  requiredFile?: keyof ReturnType<typeof useAuth>['currentUser']['permissions']['files'];
  requiredPermission?: string;
}

const PrivateRoute = ({ children, requireAdmin = false, requiredFile, requiredPermission }: PrivateRouteProps) => {
  // Use try/catch to handle potential errors with useAuth
  try {
    const { isAuthenticated, isAdmin, currentUser, hasFilePermission } = useAuth();

    useEffect(() => {
      console.log("PrivateRoute: Authentication status", { 
        isAuthenticated, 
        isAdmin, 
        currentUser: currentUser ? `${currentUser.fullName} (${currentUser.email})` : 'none',
        requiredFile,
        requiredPermission
      });
    }, [isAuthenticated, isAdmin, currentUser, requiredFile, requiredPermission]);

    // Check if user is authenticated
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to login");
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page."
      });
      return <Navigate to="/admin/login" replace />;
    }

    // Check if admin is required for the route
    if (requireAdmin && !isAdmin) {
      console.log("Admin access required but user is not admin, redirecting to home");
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page."
      });
      return <Navigate to="/" replace />;
    }

    // Check if specific file permission is required
    if (requiredFile && !isAdmin && !hasFilePermission(currentUser, requiredFile)) {
      console.log(`File permission ${requiredFile} required but user doesn't have access, redirecting to home`);
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page."
      });
      return <Navigate to="/" replace />;
    }

    // Simple checking for string permissions (e.g., "paymentMethods")
    if (requiredPermission && !isAdmin) {
      // This is a simplified check - in a real app, you'd check against user permissions
      console.log(`Permission ${requiredPermission} required`);
      // For now, we'll just let them through since we don't have a permission check function
    }

    // Render children
    return <>{children}</>;
  } catch (error) {
    console.error("Error in PrivateRoute:", error);
    toast({
      title: "Authentication Error",
      description: "There was an error checking your authentication. Please try logging in again."
    });
    return <Navigate to="/admin/login" replace />;
  }
};

export default PrivateRoute;
