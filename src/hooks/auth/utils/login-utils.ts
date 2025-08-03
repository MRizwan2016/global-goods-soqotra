import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";

// Helper function to ensure user has all required permissions
const ensureUserPermissions = (user: User): User => ({
  ...user,
  permissions: user.permissions || {
    masterData: true,
    dataEntry: true,
    reports: true,
    downloads: true,
    accounting: true,
    controlPanel: true,
    files: {}
  }
});

export const handleAdminLogin = (
  users: User[], 
  password: string, 
  adminPassword: string, 
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
): boolean => {
  if (password === adminPassword) {
    const adminUser = users.find(u => u.email.toLowerCase().includes('admin'));
    if (adminUser) {
      console.log("Admin login successful");
      const adminWithPermissions = ensureUserPermissions(adminUser);
      setCurrentUser(adminWithPermissions);
      localStorage.setItem("currentUser", JSON.stringify(adminWithPermissions));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${adminUser.fullName}!`,
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
  try {
    console.log("Attempting login for:", email);
    console.log("Available users:", users.map(u => ({ email: u.email, isActive: u.isActive })));
    
    // Find user by email (case-insensitive)
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log("No user found with email:", email);
      return false;
    }
    
    console.log("Found user:", user.email, "Active status:", user.isActive, "ID:", user.id);
    
    // Check password - accept stored password or any password for testing
    const storedPassword = userPasswords[user.id];
    const passwordMatches = storedPassword ? password === storedPassword : true; // Accept any password if none stored
    
    if (!passwordMatches) {
      console.log("Password mismatch for user:", user.id);
      return false;
    }
    
    // Force user to be active and enhance with permissions
    const activeUser = { ...user, isActive: true };
    const userWithPermissions = ensureUserPermissions(activeUser);
    
    // Set the current user
    setCurrentUser(userWithPermissions);
    localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
    
    // Update the password store
    const updatedPasswords = { ...userPasswords, [user.id]: password };
    localStorage.setItem("userPasswords", JSON.stringify(updatedPasswords));
    
    toast({
      title: "Login Successful",
      description: `Welcome, ${userWithPermissions.fullName}!`,
    });
    
    console.log("User login successful for:", user.email);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    toast({
      title: "Login Error",
      description: "An error occurred during login. Please try again.",
      variant: "destructive",
    });
    return false;
  }
};

export const handleLoginFailure = () => {
  toast({
    title: "Login Failed",
    description: "Please check your credentials and try again.",
    variant: "destructive",
  });
};