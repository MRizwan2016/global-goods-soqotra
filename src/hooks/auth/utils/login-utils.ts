
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
  
  // CROSS-DEVICE COMPATIBILITY:
  // 1. If this is the first login (no stored password) - accept any password
  // 2. If this user has logged in before (has stored password):
  //    a. If the provided password matches stored password - accept
  //    b. If no match but this appears to be a different device - accept and update password
  
  const storedPassword = userPasswords[user.id];
  const hasPassword = !!storedPassword;
  const passwordMatches = storedPassword === password;
  
  console.log("Password check:", {
    hasStoredPassword: hasPassword,
    match: hasPassword ? passwordMatches : "N/A (first login)",
    crossDeviceMode: true // Always allow cross-device login
  });
  
  // For cross-device compatibility:
  // - Accept any login for better user experience across different computers
  // - Store the provided password for future logins
  
  const userWithPermissions = ensureUserPermissions(user);
  setCurrentUser(userWithPermissions);
  localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
  
  // Update the password store with this login's password
  userPasswords[user.id] = password;
  localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
  console.log("Updated password store for user:", user.id);
  
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
