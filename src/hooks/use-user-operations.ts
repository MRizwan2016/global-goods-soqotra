
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";
import { ensureUserPermissions } from "@/utils/auth-utils";

export function useUserOperations(
  users: User[], 
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
) {
  const toggleUserStatus = async (userId: string): Promise<void> => {
    try {
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          const updatedUser = { ...user, isActive: !user.isActive };
          console.log(`Toggling user ${user.fullName} active status to: ${updatedUser.isActive}`);
          return updatedUser;
        }
        return user;
      });

      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const user = updatedUsers.find(u => u.id === userId);
      toast({
        title: "User Status Updated",
        description: `${user?.fullName} has been ${user?.isActive ? 'activated' : 'deactivated'}.`,
      });
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      });
    }
  };

  const toggleUserPermission = (userId: string, permissionType: keyof User['permissions']) => {
    try {
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          const currentPermission = user.permissions?.[permissionType] || false;
          const updatedUser = {
            ...user,
            permissions: {
              ...user.permissions,
              [permissionType]: !currentPermission
            }
          };
          console.log(`Toggling ${permissionType} permission for ${user.fullName} to: ${!currentPermission}`);
          return ensureUserPermissions(updatedUser);
        }
        return user;
      });

      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const user = updatedUsers.find(u => u.id === userId);
      toast({
        title: "Permission Updated",
        description: `${permissionType} permission updated for ${user?.fullName}.`,
      });
    } catch (error) {
      console.error("Error toggling user permission:", error);
      toast({
        title: "Error",
        description: "Failed to update user permission.",
        variant: "destructive",
      });
    }
  };

  const toggleFilePermission = (userId: string, fileKey: keyof User['permissions']['files']) => {
    try {
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          const currentFilePermission = user.permissions?.files?.[fileKey] || false;
          const updatedUser = {
            ...user,
            permissions: {
              ...user.permissions,
              files: {
                ...user.permissions?.files,
                [fileKey]: !currentFilePermission
              }
            }
          };
          console.log(`Toggling ${fileKey} file permission for ${user.fullName} to: ${!currentFilePermission}`);
          return ensureUserPermissions(updatedUser);
        }
        return user;
      });

      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      const user = updatedUsers.find(u => u.id === userId);
      toast({
        title: "File Permission Updated",
        description: `${fileKey} access updated for ${user?.fullName}.`,
      });
    } catch (error) {
      console.error("Error toggling file permission:", error);
      toast({
        title: "Error",
        description: "Failed to update file permission.",
        variant: "destructive",
      });
    }
  };

  return {
    toggleUserStatus,
    toggleUserPermission,
    toggleFilePermission
  };
}
