
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { User } from "@/types/auth";

export function usePermissions() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("usePermissions must be used within an AuthProvider");
  }
  
  const hasFilePermission = (fileKey: keyof User['permissions']['files']) => {
    return context.hasFilePermission(context.currentUser, fileKey);
  };
  
  return {
    hasFilePermission,
  };
}
