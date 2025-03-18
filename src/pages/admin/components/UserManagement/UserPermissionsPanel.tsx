
import React from "react";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/types/auth";
import CategoryPermissions from "./CategoryPermissions";
import FilePermissionSection from "./FilePermissionSection";

interface UserPermissionsPanelProps {
  user: User;
}

const UserPermissionsPanel = ({ user }: UserPermissionsPanelProps) => {
  const { toggleUserPermission, toggleFilePermission } = useAuth();

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-lg mb-2">Permissions for {user.fullName}</h4>
      
      <CategoryPermissions 
        user={user} 
        toggleUserPermission={toggleUserPermission} 
      />
      
      <FilePermissionSection 
        user={user} 
        toggleFilePermission={toggleFilePermission} 
      />
    </div>
  );
};

export default UserPermissionsPanel;
