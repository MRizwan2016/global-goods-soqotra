
import { User } from "@/types/auth";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";
import { handleAdminLogin, handleUserLogin, handleLoginFailure } from "./utils/login-utils";
import { toast } from "@/hooks/use-toast";

export function useLogin(
  users: User[], 
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt:", email);
    
    // Handle admin login
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      const adminPassword = localStorage.getItem("admin-password") || ADMIN_PASSWORD;
      const success = handleAdminLogin(users, password, adminPassword, setCurrentUser);
      if (success) return true;
    }

    // Handle regular user login
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    
    // Debug user passwords
    console.log("Available user passwords (IDs only):", Object.keys(userPasswords));
    
    const success = handleUserLogin(users, email, password, userPasswords, setCurrentUser);
    
    if (!success) {
      handleLoginFailure();
      console.log("Login failed for email:", email);
    }
    
    return success;
  };

  const logout = () => {
    console.log("Logging out user");
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return { login, logout };
}
