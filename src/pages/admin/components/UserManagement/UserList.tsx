
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/auth";
import { UserCheck, UserX, Settings, Eye, EyeOff } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserPermissionsPanel from "./UserPermissionsPanel";
import { useAuth } from "@/hooks/use-auth";

interface UserListProps {
  users: User[];
  loading: Record<string, boolean>;
  toggleUserStatus: (userId: string) => Promise<void>;
}

const UserList = ({ users, loading, toggleUserStatus }: UserListProps) => {
  const { currentUser, isAdmin } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  const handleToggleStatus = async (userId: string) => {
    await toggleUserStatus(userId);
  };

  const openPermissionsDialog = (user: User) => {
    setSelectedUser(user);
    setPermissionsDialogOpen(true);
  };

  const getUserPassword = (userId: string): string => {
    const userPasswords = JSON.parse(localStorage.getItem("userPasswords") || "{}");
    return userPasswords[userId] || "Not set";
  };

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const renderPassword = (userId: string) => {
    const password = getUserPassword(userId);
    const isVisible = showPasswords[userId];
    const canViewPasswords = currentUser?.isAdmin;

    if (!canViewPasswords) {
      return "••••••••";
    }

    return (
      <div className="flex items-center gap-2">
        <span className="text-sm font-mono">
          {isVisible ? password : "••••••••"}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => togglePasswordVisibility(userId)}
          className="h-6 w-6 p-0"
        >
          {isVisible ? (
            <EyeOff className="h-3 w-3" />
          ) : (
            <Eye className="h-3 w-3" />
          )}
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Password</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="text-sm font-medium">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{user.fullName}</span>
                  {user.isAdmin && (
                    <Badge variant="secondary" className="text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {user.email}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {user.mobileNumber}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {user.country}
              </TableCell>
              <TableCell>
                {renderPassword(user.id)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={user.isActive ? "default" : "destructive"}
                  className={`text-xs ${user.isActive ? "bg-green-600 hover:bg-green-700 text-white" : ""}`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openPermissionsDialog(user)}
                    disabled={!isAdmin}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    {isAdmin ? "Permissions" : "Admin Only"}
                  </Button>
                  
                  {!user.isAdmin && (
                    <Button
                      variant={user.isActive ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleToggleStatus(user.id)}
                      disabled={loading[user.id]}
                      className={!user.isActive ? "bg-green-600 hover:bg-green-700 text-white" : ""}
                    >
                      {user.isActive ? (
                        <>
                          <UserX className="h-4 w-4 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={permissionsDialogOpen} onOpenChange={setPermissionsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Manage User Permissions</DialogTitle>
            <DialogDescription>
              Configure access permissions for {selectedUser?.fullName}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <UserPermissionsPanel
              user={selectedUser}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserList;
