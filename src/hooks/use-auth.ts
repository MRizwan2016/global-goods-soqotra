
import { useContext } from "react";
import { AuthContext as AuthContextInternal, AuthProvider as AuthContextProvider } from "@/contexts/AuthContext";

export type { User } from "@/contexts/AuthContext";

// Re-export AuthProvider for convenience
export const AuthProvider = AuthContextProvider;

// Use the context from the context file
export function useAuth() {
  const context = useContext(AuthContextInternal);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}
