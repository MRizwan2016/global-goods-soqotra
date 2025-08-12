
import { User } from "@/types/auth";
import { toast } from "sonner";
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
      toast.success(`${user?.fullName} has been ${user?.isActive ? 'activated' : 'deactivated'}.`);
    } catch (error) {
      console.error("Error toggling user status:", error);
      toast.error("Failed to update user status.");
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
      toast.success(`${permissionType} permission updated for ${user?.fullName}.`);
    } catch (error) {
      console.error("Error toggling user permission:", error);
      toast.error("Failed to update user permission.");
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
      toast.success(`${fileKey} access updated for ${user?.fullName}.`);
    } catch (error) {
      console.error("Error toggling file permission:", error);
      toast.error("Failed to update file permission.");
    }
  };

  return {
    toggleUserStatus,
    toggleUserPermission,
    toggleFilePermission
  };
}
