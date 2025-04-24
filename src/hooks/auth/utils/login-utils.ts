
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
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.isActive);
  
  console.log("Found user:", user?.email);
  
  if (user && userPasswords[user.id] === password) {
    console.log("Password check successful for user:", user.id);
    const userWithPermissions = ensureUserPermissions(user);
    setCurrentUser(userWithPermissions);
    localStorage.setItem("currentUser", JSON.stringify(userWithPermissions));
    toast({
      title: "Login Successful",
      description: `Welcome back, ${user.fullName}!`,
    });
    return true;
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

