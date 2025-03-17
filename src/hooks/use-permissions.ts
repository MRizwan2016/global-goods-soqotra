
import { useAuth } from "./use-auth";

export function usePermissions() {
  const { currentUser } = useAuth();
  
  const isAdmin = currentUser?.isAdmin || false;
  
  const hasPermission = (permission: string) => {
    if (!currentUser) return false;
    
    if (currentUser.isAdmin) return true;
    
    if (!currentUser.permissions?.files) return false;
    
    return (currentUser.permissions.files as any)[permission] === true;
  };
  
  const hasFilePermission = (filePermission: string) => {
    return hasPermission(filePermission);
  };
  
  return {
    isAdmin,
    hasPermission,
    hasFilePermission
  };
}
