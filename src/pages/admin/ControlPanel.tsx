
import React from "react";
import Layout from "@/components/layout/Layout";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import AdminInfoCard from "./components/AdminDashboard/AdminInfoCard";
import StatCards from "./components/AdminDashboard/StatCards";
import UserManagementPanel from "./components/UserManagement/UserManagementPanel";
import { useAuth } from "@/hooks/use-auth";
import { useState } from "react";

const ControlPanel = () => {
  const { currentUser, users, toggleUserStatus } = useAuth();
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  
  return (
    <Layout title="Admin Control Panel">
      <DashboardLayout isLoaded={!!currentUser}>
        <DashboardCard>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin Control Panel</h1>
            <AdminInfoCard />
          </div>
        </DashboardCard>
        
        <DashboardCard>
          <StatCards users={users} />
        </DashboardCard>
        
        <DashboardCard>
          <UserManagementPanel 
            users={users}
            loading={loading}
            toggleUserStatus={toggleUserStatus}
          />
        </DashboardCard>
      </DashboardLayout>
    </Layout>
  );
};

export default ControlPanel;
