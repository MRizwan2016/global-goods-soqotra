import React, { useEffect, useState } from "react";
import { useNavigate from "react-router-dom";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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
  Download,
  ChevronDown,
  ChevronRight,
  DollarSign
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AccountingPanel from "@/components/accounting/AccountingPanel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// File permission configuration
const filePermissions = {
  masterData: {
    label: "Master Data",
    icon: <Database className="h-4 w-4" />,
    files: {
      salesRep: { label: "Sales Rep", path: "/master/sales-rep" },
      town: { label: "Town", path: "/master/town" },
      item: { label: "Item", path: "/master/item" },
      packageOptions: { label: "Package Options", path: "/master/package-options" },
      sellingRates: { label: "Selling Rates", path: "/master/selling-rates" },
      container: { label: "Container", path: "/master/container" },
      vessel: { label: "Vessel", path: "/master/vessel" },
      invoiceBook: { label: "Invoice Book", path: "/master/invoice-book" },
      driverHelper: { label: "Driver/Helper", path: "/master/driver-helper" },
    }
  },
  dataEntry: {
    label: "Data Entry",
    icon: <FileInput className="h-4 w-4" />,
    files: {
      invoicing: { label: "Invoicing", path: "/data-entry/invoicing" },
      paymentReceivable: { label: "Payment Receivable", path: "/data-entry/payment" },
      loadContainer: { label: "Load Container", path: "/data-entry/container" },
      loadVessel: { label: "Load Vessel", path: "/data-entry/vessel" },
      loadAirCargo: { label: "Load Air Cargo", path: "/data-entry/air-cargo" },
      packingList: { label: "Packing List", path: "/data-entry/packing-list" },
    }
  },
  reports: {
    label: "Reports",
    icon: <BarChart4 className="h-4 w-4" />,
    files: {
      cargoReports: { label: "Cargo Reports", path: "/reports/cargo" },
      financialReports: { label: "Financial Reports", path: "/reports/financial" },
      shippingReports: { label: "Shipping Reports", path: "/reports/shipping" },
    }
  },
  accounting: {
    label: "Accounts",
    icon: <DollarSign className="h-4 w-4" />,
    files: {
      paymentMethods: { label: "Payment Methods", path: "/accounts/payment-methods" },
      reconciliation: { label: "Reconciliation", path: "/accounts/reconciliation" },
      profitLoss: { label: "Profit & Loss", path: "/accounts/profit-loss" },
      financialReports: { label: "Financial Reports", path: "/accounts/financial-reports" },
    }
  }
};

const ControlPanel = () => {
  const { users, toggleUserStatus, toggleUserPermission, toggleFilePermission, currentUser, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [nonAdminUsers, setNonAdminUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, Record<string, boolean>>>({});

  useEffect(() => {
    // Check if user is logged in and is admin
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

    // Filter out admin users for the display and ensure all users have permissions
    console.log("All users:", users); // Debug: Log all users
    
    // Ensure each user has valid permissions object with files
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
            files: {}
          }
        };
      } else if (!user.permissions.files) {
        console.log("User missing file permissions:", user.email);
        return {
          ...user,
          permissions: {
            ...user.permissions,
            files: {}
          }
        };
      }
      return user;
    });
    
    const filteredUsers = usersWithPermissions.filter(user => !user.isAdmin);
    setNonAdminUsers(filteredUsers);
    
    // Initialize expanded sections state for each user
    const initialExpandedSections: Record<string, Record<string, boolean>> = {};
    filteredUsers.forEach(user => {
      initialExpandedSections[user.id] = {
        masterData: false,
        dataEntry: false,
        reports: false
      };
    });
    setExpandedSections(initialExpandedSections);
    
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

  const toggleSection = (userId: string, section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [userId]: {
        ...(prev[userId] || {}),
        [section]: !(prev[userId]?.[section] || false)
      }
    }));
  };

  const handleTogglePermission = (userId: string, permissionType: keyof User['permissions']) => {
    toggleUserPermission(userId, permissionType);
  };

  const handleToggleFilePermission = (userId: string, fileKey: keyof User['permissions']['files']) => {
    toggleFilePermission(userId, fileKey);
  };

  const renderPermissionButton = (user: User, permissionType: keyof User['permissions'], icon: React.ReactNode, label: string) => {
    // Ensure permissions exist before accessing them
    const permissions = user.permissions || {
      masterData: false,
      dataEntry: false, 
      reports: false,
      downloads: false,
      accounting: false,
      files: {}
    };
    
    const isActive = permissions[permissionType];
    
    return (
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        className={`mr-2 mb-2 ${isActive ? "" : "opacity-70"}`}
        onClick={() => handleTogglePermission(user.id, permissionType)}
      >
        {icon}
        <span className="ml-1">{label}</span>
      </Button>
    );
  };

  const renderFilePermissionToggle = (
    user: User, 
    fileKey: keyof User['permissions']['files'], 
    label: string
  ) => {
    const isChecked = !!user.permissions?.files?.[fileKey];
    
    return (
      <div className="flex items-center space-x-2 py-1">
        <Checkbox 
          id={`${user.id}-${String(fileKey)}`}
          checked={isChecked}
          onCheckedChange={() => handleToggleFilePermission(user.id, fileKey)}
        />
        <label 
          htmlFor={`${user.id}-${String(fileKey)}`}
          className="text-sm cursor-pointer"
        >
          {label}
        </label>
      </div>
    );
  };

  // Early return with loading state if needed
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

        <Tabs defaultValue="users">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="users" className="flex items-center gap-1">
              <UserIcon className="mr-1 h-4 w-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger value="accounting" className="flex items-center gap-1">
              <DollarSign className="mr-1 h-4 w-4" />
              Accounting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6 mt-4">
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
                                <div className="space-y-4">
                                  <h4 className="font-medium text-lg mb-2">Permissions for {user.fullName}</h4>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                    <Card>
                                      <CardHeader className="py-2">
                                        <CardTitle className="text-sm flex items-center">
                                          <Database className="h-4 w-4 mr-2" />
                                          Master Data Access
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="py-2">
                                        <div className="flex items-center mb-2">
                                          <Switch 
                                            checked={!!user.permissions?.masterData}
                                            onCheckedChange={() => handleTogglePermission(user.id, "masterData")}
                                            id={`${user.id}-masterData`}
                                          />
                                          <label htmlFor={`${user.id}-masterData`} className="ml-2 text-sm font-medium">
                                            {user.permissions?.masterData ? "Enabled" : "Disabled"}
                                          </label>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardHeader className="py-2">
                                        <CardTitle className="text-sm flex items-center">
                                          <FileInput className="h-4 w-4 mr-2" />
                                          Data Entry Access
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="py-2">
                                        <div className="flex items-center mb-2">
                                          <Switch 
                                            checked={!!user.permissions?.dataEntry}
                                            onCheckedChange={() => handleTogglePermission(user.id, "dataEntry")}
                                            id={`${user.id}-dataEntry`}
                                          />
                                          <label htmlFor={`${user.id}-dataEntry`} className="ml-2 text-sm font-medium">
                                            {user.permissions?.dataEntry ? "Enabled" : "Disabled"}
                                          </label>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardHeader className="py-2">
                                        <CardTitle className="text-sm flex items-center">
                                          <BarChart4 className="h-4 w-4 mr-2" />
                                          Reports Access
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="py-2">
                                        <div className="flex items-center mb-2">
                                          <Switch 
                                            checked={!!user.permissions?.reports}
                                            onCheckedChange={() => handleTogglePermission(user.id, "reports")}
                                            id={`${user.id}-reports`}
                                          />
                                          <label htmlFor={`${user.id}-reports`} className="ml-2 text-sm font-medium">
                                            {user.permissions?.reports ? "Enabled" : "Disabled"}
                                          </label>
                                        </div>
                                      </CardContent>
                                    </Card>
                                    
                                    <Card>
                                      <CardHeader className="py-2">
                                        <CardTitle className="text-sm flex items-center">
                                          <Download className="h-4 w-4 mr-2" />
                                          Downloads Access
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="py-2">
                                        <div className="flex items-center mb-2">
                                          <Switch 
                                            checked={!!user.permissions?.downloads}
                                            onCheckedChange={() => handleTogglePermission(user.id, "downloads")}
                                            id={`${user.id}-downloads`}
                                          />
                                          <label htmlFor={`${user.id}-downloads`} className="ml-2 text-sm font-medium">
                                            {user.permissions?.downloads ? "Enabled" : "Disabled"}
                                          </label>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  </div>
                                  
                                  <div className="mt-4">
                                    <h5 className="font-medium mb-2">File-Level Permissions</h5>
                                    <p className="text-sm text-muted-foreground mb-4">
                                      Configure access to specific files within each category. Users need both category-level permission
                                      and file-level permission to access a file.
                                    </p>
                                    
                                    <Accordion type="multiple" className="w-full">
                                      {/* Master Data Files */}
                                      <AccordionItem value="masterData">
                                        <AccordionTrigger className="py-2">
                                          <div className="flex items-center">
                                            <Database className="h-4 w-4 mr-2" />
                                            <span>Master Data Files</span>
                                            {user.permissions?.masterData ? (
                                              <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
                                            ) : (
                                              <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
                                            )}
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
                                            {Object.entries(filePermissions.masterData.files).map(([key, value]) => (
                                              <div key={key} className="flex items-center space-x-2 py-1">
                                                <Checkbox 
                                                  id={`${user.id}-${key}`}
                                                  checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                                                  onCheckedChange={() => handleToggleFilePermission(
                                                    user.id, 
                                                    key as keyof User['permissions']['files']
                                                  )}
                                                  disabled={!user.permissions?.masterData}
                                                />
                                                <label 
                                                  htmlFor={`${user.id}-${key}`}
                                                  className={`text-sm cursor-pointer ${!user.permissions?.masterData ? 'text-gray-400' : ''}`}
                                                >
                                                  {value.label}
                                                </label>
                                              </div>
                                            ))}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                      
                                      {/* Data Entry Files */}
                                      <AccordionItem value="dataEntry">
                                        <AccordionTrigger className="py-2">
                                          <div className="flex items-center">
                                            <FileInput className="h-4 w-4 mr-2" />
                                            <span>Data Entry Files</span>
                                            {user.permissions?.dataEntry ? (
                                              <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
                                            ) : (
                                              <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
                                            )}
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
                                            {Object.entries(filePermissions.dataEntry.files).map(([key, value]) => (
                                              <div key={key} className="flex items-center space-x-2 py-1">
                                                <Checkbox 
                                                  id={`${user.id}-${key}`}
                                                  checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                                                  onCheckedChange={() => handleToggleFilePermission(
                                                    user.id, 
                                                    key as keyof User['permissions']['files']
                                                  )}
                                                  disabled={!user.permissions?.dataEntry}
                                                />
                                                <label 
                                                  htmlFor={`${user.id}-${key}`}
                                                  className={`text-sm cursor-pointer ${!user.permissions?.dataEntry ? 'text-gray-400' : ''}`}
                                                >
                                                  {value.label}
                                                </label>
                                              </div>
                                            ))}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                      
                                      {/* Reports Files */}
                                      <AccordionItem value="reports">
                                        <AccordionTrigger className="py-2">
                                          <div className="flex items-center">
                                            <BarChart4 className="h-4 w-4 mr-2" />
                                            <span>Reports Files</span>
                                            {user.permissions?.reports ? (
                                              <Badge className="ml-2 bg-green-100 text-green-800">Category Enabled</Badge>
                                            ) : (
                                              <Badge className="ml-2 bg-gray-100 text-gray-800" variant="outline">Category Disabled</Badge>
                                            )}
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6 py-2">
                                            {Object.entries(filePermissions.reports.files).map(([key, value]) => (
                                              <div key={key} className="flex items-center space-x-2 py-1">
                                                <Checkbox 
                                                  id={`${user.id}-${key}`}
                                                  checked={!!user.permissions?.files?.[key as keyof User['permissions']['files']]}
                                                  onCheckedChange={() => handleToggleFilePermission(
                                                    user.id, 
                                                    key as keyof User['permissions']['files']
                                                  )}
                                                  disabled={!user.permissions?.reports}
                                                />
                                                <label 
                                                  htmlFor={`${user.id}-${key}`}
                                                  className={`text-sm cursor-pointer ${!user.permissions?.reports ? 'text-gray-400' : ''}`}
                                                >
                                                  {value.label}
                                                </label>
                                              </div>
                                            ))}
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    </Accordion>
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </React.Fragment>
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
          </TabsContent>

          <TabsContent value="accounting" className="mt-4">
            <AccountingPanel />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ControlPanel;
