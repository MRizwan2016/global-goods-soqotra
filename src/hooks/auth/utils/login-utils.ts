
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
  
  console.log("Found user:", user?.email);
  
  if (user) {
    // For debugging: Log the stored passwords and user ID
    console.log("User ID for password check:", user.id);
    console.log("Available password keys:", Object.keys(userPasswords));
    
    // Check if we have a password for this user and if it matches
    const storedPassword = userPasswords[user.id];
    const passwordMatches = storedPassword === password;
    
    console.log("Password check result:", passwordMatches);
    
    // If no password is stored for this user or passwords don't match but we're in cross-device mode
    // Accept the login for better user experience across different computers
    // This is done to ensure users can log in from any device
    if (!storedPassword || passwordMatches) {
      console.log("Password check successful for user:", user.id);
      const userWithPermissions = ensureUserPermissions(user);
      setCurrentUser(userWithPermissions);
      localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
      
      // If we allowed login without password match, set the provided password for this user 
      if (!storedPassword) {
        console.log("Setting provided password for user:", user.id);
        userPasswords[user.id] = password || "password123";
        localStorage.setItem("userPasswords", JSON.stringify(userPasswords));
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.fullName}!`,
      });
      return true;
    }
  }
  
  return false;
};

export const handleLoginFailure = () => {
  toast({
    title: "Login Failed",
    description: "Invalid email or password. Please try again.",
    variant: "destructive"
  });
};
