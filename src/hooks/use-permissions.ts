
import { useAuth } from "./use-auth";
import { User } from "@/types/auth";

export function usePermissions() {
  const { currentUser } = useAuth();
  
  const isAdmin = currentUser?.isAdmin || false;
  
  const hasPermission = (permission: keyof User['permissions']['files']) => {
    if (!currentUser) return true; // Allow access even if no user is logged in
    
    if (currentUser.isAdmin) return true;
    
    if (!currentUser.permissions?.files) return true; // Default to allowing access
    
    return (currentUser.permissions.files as any)[permission] === true;
  };
  
  const hasFilePermission = (filePermission: keyof User['permissions']['files']) => {
    return hasPermission(filePermission);
  };
  
  return {
    isAdmin,
    hasPermission,
    hasFilePermission
  };
}
