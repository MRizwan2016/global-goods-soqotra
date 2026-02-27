
import { User } from "@/types/auth";
import { handleLoginFailure } from "./utils/login-utils";
import { toast } from "@/hooks/use-toast";
import { toast } from "@/hooks/use-toast";

export function useLogin(
  users: User[], 
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  setShowPasswordChange?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFirstLogin?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const login = async (email: string, _password: string): Promise<boolean> => {
    // All authentication goes through Supabase Auth - no localStorage fallback
    handleLoginFailure();
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return { login, logout };
}
