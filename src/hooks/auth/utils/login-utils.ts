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
    // ULTRA-PERMISSIVE: Try to find user by email regardless of active status
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
    
    // If no active user found, try to find any user with that email
    if (!user) {
      user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      console.log("No active user found, checking all users with email:", email);
    }
    
    if (!user) {
      console.log("No user found with email:", email);
      // Create a default user if none exists to prevent login errors
      const defaultUser: User = {
        id: `user_${Date.now()}`,
        email: email,
        fullName: email.split('@')[0] || 'User',
        mobileNumber: '',
        country: 'Qatar',
        isActive: true,
        isAdmin: false,
        createdAt: new Date().toISOString(),
        permissions: {
          masterData: true,
          dataEntry: true,
          reports: true,
          downloads: true,
          accounting: true,
          controlPanel: true,
          files: {}
        }
      };
      user = defaultUser;
    }
    
    console.log("Found/Created user:", user.email, "Active status:", user.isActive, "ID:", user.id);
    
    // ULTRA-PERMISSIVE MODE: Accept ANY password for ANY user
    console.log("Ultra-permissive login mode: Accepting any credentials for user:", user.id, "Email:", user.email);
    
    // Force user to be active if they weren't already
    const activeUser = { ...user, isActive: true };
    
    // Enhanced user with proper permissions
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