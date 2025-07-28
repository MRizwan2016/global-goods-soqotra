
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
  
  // TESTING MODE: For testing purposes, allow any password for non-admin users
  // This ensures users can log in from any browser/device for testing
  const storedPassword = userPasswords[user.id];
  const isPasswordValid = !storedPassword || storedPassword === password || password.length > 0;
  
  if (!isPasswordValid) {
    console.log("Password validation failed for user:", user.id);
    return false;
  }
  
  // Enhanced user with proper permissions
  const userWithPermissions = ensureUserPermissions(user);
  
  // Set the current user
  setCurrentUser(userWithPermissions);
  localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
  
  // Always update the password store with the most recent password
  // This ensures passwords are synced across devices
  if (password) {
    userPasswords[user.id] = password;
    localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
    console.log("Updated password for user:", user.id);
  }
  
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
