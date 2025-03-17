
import { useAuth as useAuthInternal, AuthProvider as AuthProviderContext } from "@/contexts/AuthContext";

export type { User } from "@/contexts/AuthContext";

// Re-export AuthProvider for convenience
export const AuthProvider = AuthProviderContext;

// Export the hook directly from the context file
export function useAuth() {
  const auth = useAuthInternal();
  
  if (auth === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return auth;
}
