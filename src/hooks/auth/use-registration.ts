
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";

export function useRegistration(
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) {
  const register = async (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt" | "permissions"> & { password: string }): Promise<boolean> => {
    // Check if email already exists (case-insensitive comparison)
    if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
      toast({
        title: "Registration Failed",
        description: "This email is already registered.",
        variant: "destructive"
      });
      return false;
    }

    // Create new user with all permissions disabled by default
    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      mobileNumber: userData.mobileNumber,
      country: userData.country,
      isActive: false,
      isAdmin: false,
      createdAt: new Date().toISOString(),
      permissions: {
        masterData: false,
        dataEntry: false,
        reports: false,
        downloads: false,
        accounting: false,
        controlPanel: false,
        files: {
          salesRep: false,
          town: false,
          item: false,
          packageOptions: false,
          sellingRates: false,
          container: false,
          vessel: false,
          invoiceBook: false,
          driverHelper: false,
          invoicing: false,
          paymentReceivable: false
        }
      }
    };

    // Store user password separately (in real app, would be hashed)
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    userPasswords[newUser.id] = userData.password;
    localStorage.setItem("userPasswords", JSON.stringify(userPasswords));

    // Add to users list and update localStorage
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    console.log("User registered:", newUser);
    console.log("Updated users list:", updatedUsers);
    
    toast({
      title: "Registration Successful",
      description: "Your account is pending approval by an administrator.",
    });
    
    return true;
  };

  return { register };
}
