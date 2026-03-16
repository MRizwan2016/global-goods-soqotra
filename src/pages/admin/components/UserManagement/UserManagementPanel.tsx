
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserList from "./UserList";
import StatCards from "../AdminDashboard/StatCards";

interface UserManagementPanelProps {
  users: User[];
  loading: Record<string, boolean>;
  toggleUserStatus: (userId: string) => Promise<void>;
}

const UserManagementPanel = ({ users, loading, toggleUserStatus }: UserManagementPanelProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Control Panel</h1>
          <p className="text-muted-foreground">
            Manage users and system settings
          </p>
        </div>
        <Button onClick={() => navigate("/register")}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <StatCards users={users} />

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            View and manage all registered users in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserList 
            users={users} 
            loading={loading} 
            toggleUserStatus={toggleUserStatus} 
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UserManagementPanel;
