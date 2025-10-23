
import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import UserManagementPanel from "./components/UserManagement/UserManagementPanel";
import BackButton from "@/components/ui/back-button";

const ControlPanel = () => {
  const { users, toggleUserStatus } = useAuth();
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleToggleUserStatus = async (userId: string) => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await toggleUserStatus(userId);
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <BackButton to="/dashboard" />
      </div>
      <UserManagementPanel 
        users={users}
        loading={loading}
        toggleUserStatus={handleToggleUserStatus}
      />
    </div>
  );
};

export default ControlPanel;
