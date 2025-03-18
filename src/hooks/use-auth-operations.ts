
import { useState } from "react";
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/constants/auth";

export function useAuthOperations(
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
) {
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log("Login attempt:", email);
    
    // Special case for admin
    if (email === ADMIN_EMAIL) {
      const adminPassword = localStorage.getItem("admin-password") || ADMIN_PASSWORD;
      if (password === adminPassword) {
        const adminUser = users.find(user => user.email === ADMIN_EMAIL);
        if (adminUser) {
          console.log("Admin login successful");
          setCurrentUser(adminUser);
          toast({
            title: "Login Successful",
            description: "Welcome, Administrator!",
          });
          return true;
        }
      }
    }

    // Regular user login
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    const user = users.find(u => u.email === email && u.isActive);
    
    console.log("Found user:", user);
    console.log("Password check:", user ? userPasswords[user.id] === password : false);
    
    if (user && userPasswords[user.id] === password) {
      setCurrentUser(user);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.fullName}!`,
      });
      return true;
    }
    
    toast({
      title: "Login Failed",
      description: "Invalid email or password. Please try again.",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const register = async (userData: Omit<User, "id" | "isActive" | "isAdmin" | "createdAt" | "permissions"> & { password: string }): Promise<boolean> => {
    // Check if email already exists
    if (users.some(user => user.email === userData.email)) {
      toast({
        title: "Registration Failed",
        description: "This email is already registered.",
        variant: "destructive"
      });
      return false;
    }

    // Create new user
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
        files: {}
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
    
    console.log("User registered:", newUser); // Debug log
    console.log("Updated users list:", updatedUsers); // Debug log
    
    toast({
      title: "Registration Successful",
      description: "Your account is pending approval by an administrator.",
    });
    
    return true;
  };

  return {
    login,
    logout,
    register
  };
}
