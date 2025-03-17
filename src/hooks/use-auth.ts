
import { useContext } from "react";
import { AuthProvider as AuthContextProvider, useAuth as useAuthContext } from "@/contexts/AuthContext";

export type { User } from "@/contexts/AuthContext";

// Re-export AuthProvider for convenience
export const AuthProvider = AuthContextProvider;

// This is a wrapper around the context's useAuth to maintain compatibility
export function useAuth() {
  return useAuthContext();
}
