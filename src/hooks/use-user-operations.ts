
import { useState } from "react";
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { sendActivationEmail } from "@/utils/auth-utils";

export function useUserOperations(
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) {
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const toggleUserStatus = async (userId: string) => {
    // Find the user first so we can get their current status
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) {
      console.error("User not found:", userId);
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive"
      });
      return;
    }

    // Set loading state
    setLoading(prev => ({ ...prev, [userId]: true }));

    try {
      // New status will be the opposite of current status
      const newStatus = !userToUpdate.isActive;
      
      // Update the users array
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, isActive: newStatus } 
            : user
        )
      );

      // Show toast notification
      toast({
        title: `User ${newStatus ? "Activated" : "Deactivated"}`,
        description: `${userToUpdate.fullName}'s account has been ${newStatus ? "activated" : "deactivated"}.`,
      });
      
      // If the user is being activated, send an email
      if (newStatus) {
        const emailSent = await sendActivationEmail({...userToUpdate, isActive: newStatus});
        
        if (emailSent) {
          toast({
            title: "Email Notification Sent",
            description: `An email has been sent to ${userToUpdate.email} regarding their account activation.`,
          });
        } else {
          toast({
            title: "Email Notification Failed",
            description: "Could not send email notification. Please try again later.",
            variant: "destructive"
          });
        }
      }
    } finally {
      // Reset loading state
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const toggleUserPermission = (userId: string, permissionType: keyof User['permissions']) => {
    // Find the user
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) {
      console.error("User not found for permission toggle:", userId);
      return;
    }

    console.log(`Toggling permission ${permissionType} for user`, userToUpdate);

    // Update the user's permissions
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          // Ensure permissions object exists
          const currentPermissions = user.permissions || {
            masterData: false,
            dataEntry: false,
            reports: false,
            downloads: false,
            accounting: false,
            controlPanel: false,
            files: {}
          };
          
          const updatedPermissions = {
            ...currentPermissions,
            [permissionType]: !currentPermissions[permissionType]
          };
          
          console.log("Updated permissions:", updatedPermissions);
          
          return {
            ...user,
            permissions: updatedPermissions
          };
        }
        return user;
      })
    );

    // Show toast notification
    toast({
      title: `Permission Updated`,
      description: `${userToUpdate.fullName}'s access to ${permissionType} has been ${
        !userToUpdate.permissions?.[permissionType] ? 'granted' : 'revoked'
      }.`,
    });
  };

  const toggleFilePermission = (userId: string, fileKey: keyof User['permissions']['files']) => {
    // Find the user
    const userToUpdate = users.find(u => u.id === userId);
    if (!userToUpdate) {
      console.error("User not found for file permission toggle:", userId);
      return;
    }

    console.log(`Toggling file permission ${fileKey} for user`, userToUpdate);

    // Update the user's file permissions
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          // Ensure permissions and files objects exist
          const currentPermissions = user.permissions || {
            masterData: false,
            dataEntry: false,
            reports: false,
            downloads: false,
            accounting: false,
            controlPanel: false,
            files: {}
          };
          
          const currentFiles = currentPermissions.files || {};
          
          const updatedFiles = {
            ...currentFiles,
            [fileKey]: !currentFiles[fileKey]
          };
          
          console.log("Updated file permissions:", updatedFiles);
          
          return {
            ...user,
            permissions: {
              ...currentPermissions,
              files: updatedFiles
            }
          };
        }
        return user;
      })
    );

    // Show toast notification
    toast({
      title: `File Permission Updated`,
      description: `${userToUpdate.fullName}'s access to ${fileKey} has been ${
        !userToUpdate.permissions?.files?.[fileKey] ? 'granted' : 'revoked'
      }.`,
    });
  };

  return {
    loading,
    toggleUserStatus,
    toggleUserPermission,
    toggleFilePermission
  };
}
