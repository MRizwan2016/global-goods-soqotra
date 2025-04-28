
import { User } from "@/types/auth";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";
import { handleAdminLogin, handleUserLogin, handleLoginFailure } from "./utils/login-utils";
import { toast } from "@/hooks/use-toast";

export function useLogin(
  users: User[], 
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const login = async (email: string, password: string): Promise<boolean> => {
    // Normalize the email (case-insensitive comparison)
    const normalizedEmail = email.toLowerCase();
    console.log("Login attempt:", normalizedEmail);
    
    // GLOBAL CROSS-DEVICE COMPATIBILITY FLAG:
    // Set this to true to allow more flexible login across different devices
    const enableCrossDeviceMode = true;
    
    // Handle admin login
    if (normalizedEmail === ADMIN_EMAIL.toLowerCase()) {
      const adminPassword = localStorage.getItem("admin-password") || ADMIN_PASSWORD;
      const success = handleAdminLogin(users, password, adminPassword, setCurrentUser);
      if (success) return true;
    }

    // Handle regular user login with enhanced cross-device compatibility
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    
    // Debug user passwords
    console.log("Available user passwords (IDs only):", Object.keys(userPasswords));
    
    // Find the user by email (case-insensitive)
    const user = users.find(u => u.email.toLowerCase() === normalizedEmail && u.isActive);
    
    if (user) {
      console.log(`Found user: ${user.fullName} (${user.id})`);
      
      if (enableCrossDeviceMode) {
        console.log("Cross-device compatibility mode is enabled");
        
        // In cross-device mode, we're more lenient with password validation
        // We'll either:
        // 1. Accept any password for first-time logins on this device
        // 2. Check if the password matches the one we have stored
        // 3. Update the stored password to be used across devices
        const success = handleUserLogin(users, normalizedEmail, password, userPasswords, setCurrentUser);
        return success;
      } else {
        // Standard login flow (stricter password validation)
        const success = handleUserLogin(users, normalizedEmail, password, userPasswords, setCurrentUser);
        return success;
      }
    }
    
    // If no matching user found
    handleLoginFailure();
    console.log("Login failed - no matching user found for email:", normalizedEmail);
    return false;
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
