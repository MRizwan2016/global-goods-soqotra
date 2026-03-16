
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { ReactNode, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";
import { User } from "@/types/auth";
import { Loader2 } from "lucide-react";

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
  // Add error boundary for auth context
  let authContext;
  try {
    authContext = useAuth();
  } catch (error) {
    console.error("AuthProvider context error:", error);
    return <Navigate to="/login" replace />;
  }
  
  const { isAuthenticated, isAdmin, currentUser, loading } = authContext;
  
  // Add error boundary for permissions context
  let permissionsContext;
  try {
    permissionsContext = usePermissions();
  } catch (error) {
    console.error("Permissions context error:", error);
    return <Navigate to="/login" replace />;
  }
  
  const { hasFilePermission } = permissionsContext;
  const location = useLocation();

  // Auth state monitoring (no sensitive data logged)

  // Handle loading state to prevent flicker redirects
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Check if user is authenticated
  if (!isAuthenticated) {
    
    toast({
      title: "Authentication Required",
      description: "Please log in to access this page.",
      variant: "destructive",
    });
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Check if admin is required for the route
  if (requireAdmin && !isAdmin) {
    
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
    // Convert the string to a valid key for file permissions
    const fileKey = requiredFile as keyof User['permissions']['files'];
    const hasAccess = hasFilePermission(fileKey);
    
    
    if (!hasAccess) {
      toast({
        title: "Access Denied",
        description: `You do not have permission to access ${requiredFile}.`,
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }
  }

  // Create a mapping of route paths to required permissions
  const routePermissionMap: Record<string, keyof User['permissions']> = {
    "/master": "masterData",
    "/data-entry": "dataEntry",
    "/reports": "reports",
    "/accounts": "accounting",
    "/admin/control-panel": "controlPanel"
  };

  // Check if the current path requires a specific permission
  const pathRequiresPermission = Object.keys(routePermissionMap).find(path => 
    location.pathname.startsWith(path)
  );

  if (pathRequiresPermission && !isAdmin && currentUser) {
    const requiredPermission = routePermissionMap[pathRequiresPermission];
    const hasAccess = currentUser.permissions?.[requiredPermission] || false;
    
    
    
    if (!hasAccess) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this section.",
        variant: "destructive",
      });
      return <Navigate to="/" replace />;
    }
  }

  // Render children
  return <>{children}</>;
};

export default PrivateRoute;
