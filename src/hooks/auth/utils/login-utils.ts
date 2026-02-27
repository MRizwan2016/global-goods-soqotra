
import { User } from "@/types/auth";
import { toast } from "sonner";

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
    cargoDelivery: true,
    accountFunctions: false,
    accountRegistrations: false,
    accountFinancialEntities: false,
    accountCountryReconciliations: false,
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
      const adminWithPermissions = ensureUserPermissions(adminUser);
      setCurrentUser(adminWithPermissions);
      localStorage.setItem("currentUser", JSON.stringify(adminWithPermissions));
      toast.success(`Welcome back, ${adminUser.fullName}!`);
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
    // Find user by email (case-insensitive)
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return false;
    }

    // User must be active to login
    if (!user.isActive) {
      toast.error("Your account is not active. Please contact an administrator.");
      return false;
    }
    
    // Check password - must match stored password exactly
    const storedPassword = userPasswords[user.id];
    
    if (!storedPassword || password !== storedPassword) {
      return false;
    }
    
    // Enhance user with permissions
    const userWithPermissions = ensureUserPermissions(user);
    
    // Set the current user
    setCurrentUser(userWithPermissions);
    localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
    
    toast.success(`Welcome, ${userWithPermissions.fullName}!`);
    return true;
  } catch (error) {
    console.error("Login error occurred");
    toast.error("An error occurred during login. Please try again.");
    return false;
  }
};

export const handleLoginFailure = () => {
  toast.error("Invalid email or password. Please check your credentials and try again.");
};
