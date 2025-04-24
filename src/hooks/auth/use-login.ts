
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";
import { ensureUserPermissions } from "@/utils/auth-utils";

export function useLogin(
  users: User[], 
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt:", email);
    
    // Special case for admin
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      const adminPassword = localStorage.getItem("admin-password") || ADMIN_PASSWORD;
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
    }

    // Regular user login - using case-insensitive email comparison
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
    
    console.log("Found user:", user?.email);
    
    if (user) {
      console.log("Password check for user:", user.id);
      
      if (userPasswords[user.id] === password) {
        // Ensure user has all required permissions properly set up
        const userWithPermissions = ensureUserPermissions(user);
        setCurrentUser(userWithPermissions);
        localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.fullName}!`,
        });
        return true;
      } else {
        console.log("Password mismatch");
      }
    } else {
      console.log("No active user found with that email");
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive"
    });
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
