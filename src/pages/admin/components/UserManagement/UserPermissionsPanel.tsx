
import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { User } from "@/types/auth";
import CategoryPermissions from "./CategoryPermissions";
import FilePermissionSection from "./FilePermissionSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save } from "lucide-react";

interface UserPermissionsPanelProps {
  user: User;
}

const UserPermissionsPanel = ({ user }: UserPermissionsPanelProps) => {
  const { toggleUserPermission, toggleFilePermission, isAdmin } = useAuth();
  const [saving, setSaving] = useState(false);
  
  // Save user permissions - permissions are saved in real-time via toggleUserPermission/toggleFilePermission
  const handleSavePermissions = async () => {
    if (!isAdmin) {
      toast.error("Only administrators can save user permissions");
      return;
    }
    
    setSaving(true);
    try {
      // Permissions are already saved to DB on each toggle
      // This button confirms the final state
      toast.success(`Permissions for ${user.fullName} saved successfully`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-lg mb-2">Permissions for {user.fullName}</h4>
      
      <CategoryPermissions 
        user={user} 
        toggleUserPermission={toggleUserPermission}
        isAdminOnly={!isAdmin}
      />
      
      <FilePermissionSection 
        user={user} 
        toggleFilePermission={toggleFilePermission}
        isAdminOnly={!isAdmin}
      />
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={handleSavePermissions} 
          disabled={saving || !isAdmin}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          {saving ? "Saving..." : isAdmin ? "Save Permissions" : "Admin Only"}
        </Button>
      </div>
    </div>
  );
};

export default UserPermissionsPanel;
