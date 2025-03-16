
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, User } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  User as UserIcon, 
  Shield, 
  UserPlus, 
  Calendar, 
  Globe,
  Loader,
  Database,
  FileInput,
  BarChart4,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ControlPanel = () => {
  const { users, toggleUserStatus, toggleUserPermission, currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [nonAdminUsers, setNonAdminUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Check if user is logged in and is admin
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive",
      });
      navigate("/admin/login");
      return;
    }

    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access the Control Panel.",
        variant: "destructive",
      });
      navigate("/");
      return;
    }

    // Filter out admin users for the display and ensure all users have permissions
    console.log("All users:", users); // Debug: Log all users
    
    // Ensure each user has a valid permissions object
    const usersWithPermissions = users.map(user => {
      if (!user.permissions) {
        return {
          ...user,
          permissions: {
            masterData: false,
            dataEntry: false,
            reports: false,
            downloads: false
          }
        };
      }
      return user;
    });
    
    const filteredUsers = usersWithPermissions.filter(user => !user.isAdmin);
    setNonAdminUsers(filteredUsers);
    console.log("Non-admin users:", filteredUsers); // Debug: Log filtered users
  }, [currentUser, isAdmin, navigate, users]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleToggleStatus = async (userId: string) => {
    setLoading(prev => ({ ...prev, [userId]: true }));
    try {
      await toggleUserStatus(userId);
    } finally {
      setLoading(prev => ({ ...prev, [userId]: false }));
    }
  };

  const toggleExpand = (userId: string) => {
    setExpandedUsers(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleTogglePermission = (userId: string, permissionType: keyof User['permissions']) => {
    toggleUserPermission(userId, permissionType);
  };

  const renderPermissionButton = (user: User, permissionType: keyof User['permissions'], icon: React.ReactNode, label: string) => {
    // Ensure permissions exist before accessing them
    const isActive = user.permissions ? user.permissions[permissionType] : false;
    return (
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        className={`mr-2 mb-2 ${isActive ? "" : "opacity-70"}`}
        onClick={() => handleTogglePermission(user.id, permissionType)}
      >
        {icon}
        <span>{label}</span>
      </Button>
    );
  };

  return (
    <Layout title="Admin Control Panel">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Control Panel</h1>
            <p className="text-muted-foreground">
              Manage users and system settings
            </p>
          </div>
          <Button onClick={() => navigate("/admin/register")}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add New User
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-muted-foreground" />
                <div className="text-2xl font-bold">{nonAdminUsers.length}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div className="text-2xl font-bold">{nonAdminUsers.filter(user => user.isActive).length}</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Activation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-yellow-500" />
                <div className="text-2xl font-bold">{nonAdminUsers.filter(user => !user.isActive).length}</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage all registered users in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                {nonAdminUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No users registered yet
                    </TableCell>
                  </TableRow>
                ) : (
                  nonAdminUsers.map((user) => (
                    <>
                      <TableRow key={user.id}>
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
                              onClick={() => handleToggleStatus(user.id)}
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
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    Permissions
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                  <DropdownMenuLabel>User Permissions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleTogglePermission(user.id, "masterData")}
                                    className={user.permissions && user.permissions.masterData ? "bg-green-50" : ""}
                                  >
                                    <Database className="mr-2 h-4 w-4" />
                                    <span>Master Data</span>
                                    {user.permissions && user.permissions.masterData && <CheckCircle className="ml-auto h-4 w-4 text-green-600" />}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleTogglePermission(user.id, "dataEntry")}
                                    className={user.permissions && user.permissions.dataEntry ? "bg-green-50" : ""}
                                  >
                                    <FileInput className="mr-2 h-4 w-4" />
                                    <span>Data Entry</span>
                                    {user.permissions && user.permissions.dataEntry && <CheckCircle className="ml-auto h-4 w-4 text-green-600" />}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleTogglePermission(user.id, "reports")}
                                    className={user.permissions && user.permissions.reports ? "bg-green-50" : ""}
                                  >
                                    <BarChart4 className="mr-2 h-4 w-4" />
                                    <span>Reports</span>
                                    {user.permissions && user.permissions.reports && <CheckCircle className="ml-auto h-4 w-4 text-green-600" />}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleTogglePermission(user.id, "downloads")}
                                    className={user.permissions && user.permissions.downloads ? "bg-green-50" : ""}
                                  >
                                    <Download className="mr-2 h-4 w-4" />
                                    <span>Downloads</span>
                                    {user.permissions && user.permissions.downloads && <CheckCircle className="ml-auto h-4 w-4 text-green-600" />}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                      {user.isActive && expandedUsers[user.id] && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-slate-50">
                            <div className="p-2">
                              <h4 className="font-medium mb-2">User Permissions</h4>
                              <div className="flex flex-wrap">
                                {renderPermissionButton(user, "masterData", <Database className="h-4 w-4 mr-1" />, "Master Data")}
                                {renderPermissionButton(user, "dataEntry", <FileInput className="h-4 w-4 mr-1" />, "Data Entry")}
                                {renderPermissionButton(user, "reports", <BarChart4 className="h-4 w-4 mr-1" />, "Reports")}
                                {renderPermissionButton(user, "downloads", <Download className="h-4 w-4 mr-1" />, "Downloads")}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Administrator Information</CardTitle>
            <CardDescription>
              System administrator details and credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Admin Credentials:</span>
              </div>
              <div className="border p-4 rounded-md bg-gray-50">
                <p className="flex items-center gap-2">
                  <span className="font-medium">Username/Email:</span> 
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">admin@soqotra.com</span>
                </p>
                <p className="flex items-center gap-2 mt-2">
                  <span className="font-medium">Password:</span> 
                  <span className="text-sm font-mono bg-white px-2 py-1 rounded border">admin123</span>
                </p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                <span className="text-yellow-600 font-medium">Important:</span> For 
                security reasons, please change the default admin password after your first login.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ControlPanel;
