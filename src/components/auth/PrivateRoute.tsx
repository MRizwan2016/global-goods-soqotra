
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface PrivateRouteProps {
  children?: ReactNode;
  requireAdmin?: boolean;
  requiredFile?: keyof ReturnType<typeof useAuth>['currentUser']['permissions']['files'];
  requiredPermission?: string;
}

const PrivateRoute = ({ children, requireAdmin = false, requiredFile, requiredPermission }: PrivateRouteProps) => {
  // Use try/catch to handle potential errors with useAuth
  try {
    const auth = useAuth();
    
    if (!auth) {
      console.error("Auth context is undefined");
      return <Navigate to="/admin/login" replace />;
    }
    
    const { isAuthenticated, isAdmin, currentUser, hasFilePermission } = auth;

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
    if (requiredFile && !isAdmin && currentUser && !hasFilePermission(currentUser, requiredFile)) {
      console.log(`File permission ${requiredFile} required but user doesn't have access, redirecting to home`);
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page."
      });
      return <Navigate to="/" replace />;
    }

    // Simple checking for string permissions (e.g., "paymentMethods")
    if (requiredPermission && !isAdmin && currentUser) {
      // This is a simplified check - in a real app, you'd check against user permissions
      console.log(`Permission ${requiredPermission} required`);
      if (currentUser && currentUser.permissions && currentUser.permissions.files) {
        const hasPermission = requiredPermission in currentUser.permissions.files;
        if (!hasPermission) {
          toast({
            title: "Access Denied",
            description: "You do not have permission to access this page."
          });
          return <Navigate to="/" replace />;
        }
      }
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
