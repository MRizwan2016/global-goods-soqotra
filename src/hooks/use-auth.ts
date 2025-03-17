
import { useContext } from "react";
import { AuthContext, AuthProvider as AuthContextProvider } from "@/contexts/AuthContext";

export type { User } from "@/contexts/AuthContext";

// Re-export AuthProvider for convenience
export const AuthProvider = AuthContextProvider;

// This is a wrapper around the context's useAuth to maintain compatibility
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
