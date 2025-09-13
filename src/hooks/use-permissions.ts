
import { useAuth } from "@/contexts/AuthContext";

export function usePermissions() {
  const { user } = useAuth();
  
  // For Tunisia project, we'll assume all authenticated users have access
  const hasFilePermission = (fileKey: string) => {
    return !!user; // If user is authenticated, they have permission
  };
  
  return {
    hasFilePermission,
  };
}
