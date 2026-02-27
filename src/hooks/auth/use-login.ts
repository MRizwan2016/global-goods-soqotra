
import { User } from "@/types/auth";
import { ADMIN_EMAIL } from "@/constants/auth";
import { handleAdminLogin, handleUserLogin, handleLoginFailure } from "./utils/login-utils";
import { toast } from "@/hooks/use-toast";

export function useLogin(
  users: User[], 
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>,
  setShowPasswordChange?: React.Dispatch<React.SetStateAction<boolean>>,
  setIsFirstLogin?: React.Dispatch<React.SetStateAction<boolean>>
) {
  const login = async (email: string, password: string): Promise<boolean> => {
    const normalizedEmail = email.toLowerCase();
    
    // Handle admin login
    if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
      const adminPassword = localStorage.getItem("admin-password");
      if (adminPassword) {
        const success = handleAdminLogin(users, password, adminPassword, setCurrentUser);
        if (success) return true;
      }
    }

    // Get stored passwords
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    
    // Find the user by email (case-insensitive) - must be active
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.isActive);
    
    if (user) {
      // Check if it's first login (password is still the initial password)
      const storedPassword = userPasswords[user.id];
      if (password === storedPassword && password === "123456" && setShowPasswordChange && setIsFirstLogin) {
        setIsFirstLogin(true);
        setShowPasswordChange(true);
      }
      
      const success = handleUserLogin(users, normalizedEmail, password, userPasswords, setCurrentUser);
      return success;
    }
    
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
