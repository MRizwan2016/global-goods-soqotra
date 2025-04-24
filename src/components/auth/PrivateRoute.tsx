
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";

interface PrivateRouteProps {
  children?: ReactNode;
  requireAdmin?: boolean;
  requiredFile?: string;
  requiredPermission?: string;
}

const PrivateRoute = ({ 
  children, 
  requireAdmin = false, 
  requiredFile,
  requiredPermission
}: PrivateRouteProps) => {
  const { isAuthenticated, isAdmin, currentUser } = useAuth();
  const { hasFilePermission } = usePermissions();

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

  // Check if specific permission is required
  if (requiredPermission && !isAdmin && currentUser) {
    const permissionKey = requiredPermission as keyof typeof currentUser.permissions;
    const hasPermission = currentUser.permissions[permissionKey];
    console.log(`Permission ${requiredPermission} required, user has access: ${hasPermission}`);
    
    if (!hasPermission) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this page.",
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }
  }

  // Check if specific file permission is required
  if (requiredFile && !isAdmin) {
    // Make sure requiredFile is a valid key before checking permissions
    const fileKey = requiredFile as string;
    const hasAccess = hasFilePermission(fileKey);
    console.log(`File permission ${requiredFile} required, user has access: ${hasAccess}`);
    
    if (!hasAccess) {
      toast({
        title: "Access Denied",
        description: `You do not have permission to access ${requiredFile}.`,
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }
  }

  // Render children
  return <>{children}</>;
};

export default PrivateRoute;
