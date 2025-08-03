
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import type { User, AuthContextType } from "@/types/auth";

// Export the User type for convenience
export type { User };

// Export the hook function that consumes the context with enhanced error handling
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    // More specific error message with debugging info
    console.error("useAuth hook called outside of AuthProvider");
    console.error("Make sure your component is wrapped in an AuthProvider");
    throw new Error("useAuth must be used within an AuthProvider. Check that your component tree includes <AuthProvider>");
  }
  
  return context;
}
