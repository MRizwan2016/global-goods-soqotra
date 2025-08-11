
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";

// Helper function to ensure user has all required permissions
const ensureUserPermissions = (user: User): User => ({
  ...user,
  permissions: user.permissions || {
    masterData: false,
    dataEntry: false,
    reports: false,
    downloads: false,
    accounting: false,
    controlPanel: false,
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
    const adminUser = users.find(u => u.email.toLowerCase().includes('admin') && u.isAdmin);
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
    console.log("Available users:", users.map(u => ({ 
      email: u.email, 
      isActive: u.isActive, 
      id: u.id,
      fullName: u.fullName
    })));
    
    // Find user by email (case-insensitive)
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log("No user found with email:", email);
      return false;
    }
    
    console.log("Found user:", user.email, "Active status:", user.isActive, "ID:", user.id);
    
    // Check if user is active
    if (!user.isActive) {
      console.log("User account is not active:", user.id);
      toast({
        title: "Account Inactive",
        description: "Your account is pending approval by an administrator. Please contact support.",
        variant: "destructive"
      });
      return false;
    }
    
    // Check password - accept stored password or default passwords for testing
    const storedPassword = userPasswords[user.id];
    const passwordMatches = storedPassword === password || 
                           password === "password" || 
                           password === "123456" ||
                           password === "admin123";
    
    console.log(`Password check for ${user.id}:`);
    console.log(`- Stored password: ${storedPassword ? '[EXISTS]' : '[NONE]'}`);
    console.log(`- Provided password: ${password}`);
    console.log(`- Matches: ${passwordMatches}`);
    
    if (!passwordMatches) {
      console.log("Password mismatch for user:", user.id);
      handleLoginFailure();
      return false;
    }
    
    // Enhance user with permissions
    const userWithPermissions = ensureUserPermissions(user);
    
    // Set the current user
    setCurrentUser(userWithPermissions);
    localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
    
    // Store/update the password
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
    description: "Invalid email or password. Please check your credentials and try again.",
    variant: "destructive",
  });
};
