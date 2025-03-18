
import React, { useState } from "react";
import { User } from "@/types/auth";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserIcon, 
  Globe, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  ChevronRight, 
  Loader 
} from "lucide-react";
import UserPermissionsPanel from "./UserPermissionsPanel";

interface UserListProps {
  users: User[];
  loading: Record<string, boolean>;
  toggleUserStatus: (userId: string) => Promise<void>;
}

const UserList = ({ users, loading, toggleUserStatus }: UserListProps) => {
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const toggleExpand = (userId: string) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Registration Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
              No users registered yet
            </TableCell>
          </TableRow>
        ) : (
          users.map((user) => (
            <React.Fragment key={user.id}>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-muted-foreground" />
                    {user.fullName}
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.mobileNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    {user.country}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    {formatDate(user.createdAt)}
                  </div>
                </TableCell>
                <TableCell>
                  {user.isActive ? (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border-yellow-300">
                      Pending
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant={user.isActive ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                      disabled={loading[user.id]}
                    >
                      {loading[user.id] ? (
                        <>
                          <Loader className="mr-1 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : user.isActive ? (
                        <>
                          <XCircle className="mr-1 h-4 w-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Activate
                        </>
                      )}
                    </Button>
                    
                    {user.isActive && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleExpand(user.id)}
                      >
                        {expandedUsers[user.id] ? "Hide" : "Manage"} Permissions
                        {expandedUsers[user.id] ? 
                          <ChevronDown className="ml-1 h-4 w-4" /> : 
                          <ChevronRight className="ml-1 h-4 w-4" />
                        }
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              {user.isActive && expandedUsers[user.id] && (
                <TableRow>
                  <TableCell colSpan={7} className="bg-slate-50 p-4">
                    <UserPermissionsPanel user={user} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UserList;
