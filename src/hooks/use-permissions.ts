
import { useAuth } from "./use-auth";
import { User } from "@/types/auth";

export function usePermissions() {
  const { currentUser } = useAuth();
  
  const isAdmin = currentUser?.isAdmin || false;
  
  const hasPermission = (permission: keyof User['permissions']) => {
    if (!currentUser) return false;
    
    if (currentUser.isAdmin) return true;
    
    return currentUser.permissions[permission] === true;
  };
  
  const hasFilePermission = (filePermission: keyof User['permissions']['files']) => {
    if (!currentUser) return false;
    
    if (currentUser.isAdmin) return true;
    
    // Default to true if permissions or files aren't set
    if (!currentUser.permissions?.files) return true;
    if (currentUser.permissions.files[filePermission] === undefined) return true;
    
    return !!currentUser.permissions.files[filePermission];
  };
  
  return {
    isAdmin,
    hasPermission,
    hasFilePermission
  };
}
