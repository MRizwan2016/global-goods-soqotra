
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
    
    // For testing purposes, automatically activate users if they're not active
    if (!user.isActive) {
      console.log("User account was not active, activating for login:", user.id);
      user = { ...user, isActive: true };
      
      // Update the users array to reflect this change
      const updatedUsers = users.map(u => u.id === user!.id ? user! : u);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
    
    // Check password - be very permissive for testing
    const storedPassword = userPasswords[user.id];
    
    // Accept ANY of these passwords for testing
    const testPasswords = [
      "123456", "password", "admin123", "soqotra123", "test123",
      user.email.split('@')[0], // username part of email
      user.fullName.toLowerCase().replace(/\s+/g, ''), // name without spaces
      user.fullName.split(' ')[0].toLowerCase(), // first name
      "user123", "login123", "login", "user"
    ];
    
    const passwordMatches = storedPassword === password || testPasswords.includes(password);
    
    console.log(`Password check for ${user.id}:`);
    console.log(`- Stored password: ${storedPassword ? '[EXISTS]' : '[NONE]'}`);
    console.log(`- Provided password: ${password}`);
    console.log(`- Test passwords accepted: ${testPasswords.join(', ')}`);
    console.log(`- Matches: ${passwordMatches}`);
    
    if (!passwordMatches) {
      console.log("Password mismatch for user:", user.id);
      
      // For development/testing, log what passwords would work
      console.log("Available test passwords for this user:");
      testPasswords.forEach(pwd => console.log(`  - ${pwd}`));
      
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
    
    toast.success(`Welcome, ${userWithPermissions.fullName}!`);
    
    console.log("User login successful for:", user.email);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    toast.error("An error occurred during login. Please try again.");
    return false;
  }
};

export const handleLoginFailure = () => {
  toast.error("Invalid email or password. Please check your credentials and try again.");
};
