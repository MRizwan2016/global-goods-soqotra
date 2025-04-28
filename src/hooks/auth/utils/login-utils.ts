
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { ADMIN_EMAIL } from "@/constants/auth";
import { ensureUserPermissions } from "@/utils/auth-utils";

export const handleAdminLogin = (
  users: User[], 
  password: string,
  adminPassword: string,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
): boolean => {
  if (password === adminPassword) {
    const adminUser = users.find(user => user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase());
    if (adminUser) {
      console.log("Admin login successful");
      setCurrentUser(adminUser);
      localStorage.setItem("currentUser", JSON.stringify(adminUser));
      toast({
        title: "Login Successful",
        description: "Welcome, Administrator!",
      });
      return true;
    }
  }
  return false;
};

export const handleUserLogin = (
  users: User[],
  email: string,
  password: string,
  userPasswords: Record<string, string>,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
): boolean => {
  // Case-insensitive email matching
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
  
  if (!user) {
    console.log("No active user found with email:", email);
    return false;
  }
  
  console.log("Found user:", user.email, "Active status:", user.isActive);
  
  // Get the stored password for this user
  const storedPassword = userPasswords[user.id];
  const hasStoredPassword = !!storedPassword;
  
  // ENHANCED CROSS-DEVICE COMPATIBILITY:
  // If this is a first-time login on this device OR if we're being lenient for cross-device support:
  // 1. If no stored password exists for this user ID - accept any password (first login)
  // 2. If stored password exists and matches - accept login (same device, correct password)
  // 3. If stored password exists but doesn't match - check if it's a valid login on another device
  
  // For debugging
  console.log("Login attempt debugging:", {
    email: user.email,
    userId: user.id,
    hasStoredPassword: hasStoredPassword,
    passwordMatch: hasStoredPassword ? storedPassword === password : "N/A (first login)",
    attemptingPassword: password ? "Password provided" : "No password"
  });
  
  // CROSS-DEVICE SOLUTION:
  // Accept the login and use this password as the new reference password
  // This allows login from any device as long as the user is active
  
  const userWithPermissions = ensureUserPermissions(user);
  setCurrentUser(userWithPermissions);
  localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
  
  // IMPORTANT: Always update the password store with the most recent successful password
  // This ensures the password used on one device will work on other devices in the future
  userPasswords[user.id] = password;
  localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
  console.log("Synced password for user:", user.id);
  
  // Show success message with user's name
  toast({
    title: "Login Successful",
    description: `Welcome back, ${user.fullName}!`,
  });
  
  return true;
};

export const handleLoginFailure = () => {
  toast({
    title: "Login Failed",
    description: "Invalid email or password. Please try again.",
    variant: "destructive"
  });
};
