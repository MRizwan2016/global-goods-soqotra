
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "@/hooks/use-auth";
import Layout from "@/components/layout/Layout";
import { Loader, UserIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import UserManagementPanel from "./components/UserManagement/UserManagementPanel";
import AdminInfoCard from "./components/AdminDashboard/AdminInfoCard";

const ControlPanel = () => {
  const { users, toggleUserStatus, currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [nonAdminUsers, setNonAdminUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!currentUser) {
      console.log("No current user found");
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
      navigate("/admin/login");
      return;
    }

    if (!isAdmin) {
      console.log("User is not admin:", currentUser);
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the Control Panel.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    console.log("All users:", users);

    // Ensure all users have proper permissions structure
    const usersWithPermissions = users.map(user => {
      if (!user.permissions) {
        console.log("User missing permissions:", user.email);
        return {
          ...user,
          permissions: {
            masterData: user.isAdmin ? true : false,
            dataEntry: user.isAdmin ? true : false,
            reports: user.isAdmin ? true : false,
            downloads: user.isAdmin ? true : false,
            accounting: user.isAdmin ? true : false,
            controlPanel: user.isAdmin ? true : false,
            files: {
              salesRep: true,
              town: true,
              item: true,
              packageOptions: true,
              sellingRates: true,
              container: true,
              vessel: true,
              invoiceBook: true,
              driverHelper: true,
              invoicing: true,
              paymentReceivable: true
            }
          }
        };
      } else if (!user.permissions.files) {
        console.log("User missing file permissions:", user.email);
        return {
          ...user,
          permissions: {
            ...user.permissions,
            controlPanel: user.permissions.controlPanel ?? user.isAdmin,
            files: {
              salesRep: true,
              town: true,
              item: true,
              packageOptions: true,
              sellingRates: true,
              container: true,
              vessel: true,
              invoiceBook: true,
              driverHelper: true,
              invoicing: true,
              paymentReceivable: true
            }
          }
        };
      }
      return user;
    });
    
    // Filter out admin users
    const filteredUsers = usersWithPermissions.filter(user => !user.isAdmin);
    setNonAdminUsers(filteredUsers);
    
    console.log("Non-admin users:", filteredUsers);
  }, [currentUser, isAdmin, navigate, users]);

  const handleToggleStatus = async (userId: string) => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await toggleUserStatus(userId);
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  if (!currentUser || !isAdmin) {
    return (
      <Layout title="Loading...">
        <div className="flex items-center justify-center h-screen">
          <Loader className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading admin panel...</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Admin Control Panel">
      <div className="space-y-6 p-6">
        <Tabs defaultValue="users">
          <TabsList className="grid grid-cols-1 w-[200px]">
            <TabsTrigger value="users" className="flex items-center gap-1">
              <UserIcon className="mr-1 h-4 w-4" />
              User Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6 mt-4">
            <UserManagementPanel 
              users={nonAdminUsers} 
              loading={loading}
              toggleUserStatus={handleToggleStatus}
            />
            
            <AdminInfoCard />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ControlPanel;
