
import { useAuth } from "./use-auth";
import type { User } from "@/contexts/AuthContext";

export function usePermissions() {
  const { currentUser, isAdmin, hasFilePermission } = useAuth();

  const hasPermission = (fileKey: keyof User['permissions']['files']) => {
    if (!currentUser) return false;
    if (isAdmin) return true;
    return hasFilePermission(currentUser, fileKey);
  };

  return {
    hasPermission,
    isAdmin,
  };
}
