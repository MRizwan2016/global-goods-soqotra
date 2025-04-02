
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import type { User, AuthContextType } from "@/types/auth";

// Export the User type for convenience
export type { User };

// Export the hook function that consumes the context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
