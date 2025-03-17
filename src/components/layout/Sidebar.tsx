import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  BookText,
  Building2,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Receipt,
  Settings,
  Ship,
  ShoppingCart,
  Truck,
  User,
  Users,
  Wallet,
  CreditCard,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { usePermissions } from "@/hooks/use-permissions";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarWrapper = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { toast } = useToast();
  const { hasPermission, isAdmin } = usePermissions();
  const [open, setOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/data-entry")) {
      setActiveSubmenu("data-entry");
    } else if (path.includes("/accounts")) {
      setActiveSubmenu("accounts");
    } else if (path.includes("/reports")) {
      setActiveSubmenu("reports");
    } else if (path.includes("/master")) {
      setActiveSubmenu("master");
    } else if (path.includes("/admin")) {
      setActiveSubmenu("admin");
    } else {
      setActiveSubmenu(null);
    }
  }, [location.pathname]);

  const toggleSubmenu = (submenu: string) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSubActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar>
        <SidebarHeader className="border-b border-border/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <Ship className="h-6 w-6 text-primary" />
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">GY Shipping</span>
              <span className="text-xs text-muted-foreground">Cargo Management</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                isActive={isActive("/")}
                tooltip="Dashboard"
              >
                <Link to="/">
                  <LayoutDashboard className="mr-2" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => toggleSubmenu("data-entry")}
                isActive={isSubActive("/data-entry")}
                tooltip="Data Entry"
                className="justify-between"
              >
                <div className="flex items-center">
                  <ClipboardList className="mr-2" />
                  <span>Data Entry</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeSubmenu === "data-entry" ? "rotate-180" : ""
                  )}
                />
              </SidebarMenuButton>

              {activeSubmenu === "data-entry" && (
                <SidebarMenuSub>
                  {hasPermission("invoicing") && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/data-entry/invoicing")}
                      >
                        <Link to="/data-entry/invoicing">
                          <Receipt className="mr-2 h-4 w-4" />
                          <span>Invoicing</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}

                  {hasPermission("paymentReceivable") && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/data-entry/payment-receivable")}
                      >
                        <Link to="/data-entry/payment-receivable">
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Payment Receivable</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}

                  {hasPermission("invoiceBook") && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/data-entry/booking-form-stock")}
                      >
                        <Link to="/data-entry/booking-form-stock">
                          <BookText className="mr-2 h-4 w-4" />
                          <span>Booking Form Stock</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}

                  {hasPermission("sellingRates") && (
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/data-entry/selling-rates")}
                      >
                        <Link to="/data-entry/selling-rates">
                          <CircleDollarSign className="mr-2 h-4 w-4" />
                          <span>Selling Rates</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  )}

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isActive("/data-entry/bill-of-lading")}
                    >
                      <Link to="/data-entry/bill-of-lading">
                        <FileText className="mr-2 h-4 w-4" />
                        <span>Bill of Lading</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>

                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton
                      asChild
                      isActive={isActive("/data-entry/print-documents")}
                    >
                      <Link to="/data-entry/print-documents">
                        <Truck className="mr-2 h-4 w-4" />
                        <span>Print Documents</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>

            {(hasPermission("paymentMethods") || hasPermission("reconciliation")) && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleSubmenu("accounts")}
                  isActive={isSubActive("/accounts")}
                  tooltip="Accounts"
                  className="justify-between"
                >
                  <div className="flex items-center">
                    <Wallet className="mr-2" />
                    <span>Accounts</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeSubmenu === "accounts" ? "rotate-180" : ""
                    )}
                  />
                </SidebarMenuButton>

                {activeSubmenu === "accounts" && (
                  <SidebarMenuSub>
                    {hasPermission("paymentMethods") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/accounts/payments")}
                        >
                          <Link to="/accounts/payments">
                            <CircleDollarSign className="mr-2 h-4 w-4" />
                            <span>Payments</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}

                    {hasPermission("reconciliation") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/accounts/reconciliation")}
                        >
                          <Link to="/accounts/reconciliation">
                            <Receipt className="mr-2 h-4 w-4" />
                            <span>Reconciliation</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            )}

            {(hasPermission("financialReports") || hasPermission("cargoReports")) && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleSubmenu("reports")}
                  isActive={isSubActive("/reports")}
                  tooltip="Reports"
                  className="justify-between"
                >
                  <div className="flex items-center">
                    <BarChart3 className="mr-2" />
                    <span>Reports</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeSubmenu === "reports" ? "rotate-180" : ""
                    )}
                  />
                </SidebarMenuButton>

                {activeSubmenu === "reports" && (
                  <SidebarMenuSub>
                    {hasPermission("financialReports") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/reports/financial")}
                        >
                          <Link to="/reports/financial">
                            <CircleDollarSign className="mr-2 h-4 w-4" />
                            <span>Financial Reports</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}

                    {hasPermission("cargoReports") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/reports/cargo")}
                        >
                          <Link to="/reports/cargo">
                            <Package className="mr-2 h-4 w-4" />
                            <span>Cargo Reports</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            )}

            {(hasPermission("invoiceBook") ||
              hasPermission("salesRep") ||
              hasPermission("town") ||
              hasPermission("packageOptions")) && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleSubmenu("master")}
                  isActive={isSubActive("/master")}
                  tooltip="Master Data"
                  className="justify-between"
                >
                  <div className="flex items-center">
                    <Building2 className="mr-2" />
                    <span>Master Data</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeSubmenu === "master" ? "rotate-180" : ""
                    )}
                  />
                </SidebarMenuButton>

                {activeSubmenu === "master" && (
                  <SidebarMenuSub>
                    {hasPermission("invoiceBook") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/master/invoice-book")}
                        >
                          <Link to="/master/invoice-book">
                            <BookText className="mr-2 h-4 w-4" />
                            <span>Invoice Book</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}

                    {hasPermission("salesRep") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/master/sales-rep")}
                        >
                          <Link to="/master/sales-rep">
                            <Users className="mr-2 h-4 w-4" />
                            <span>Sales Rep</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}

                    {hasPermission("town") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/master/town")}
                        >
                          <Link to="/master/town">
                            <Home className="mr-2 h-4 w-4" />
                            <span>Town</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}

                    {hasPermission("packageOptions") && (
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isActive("/master/package-options")}
                        >
                          <Link to="/master/package-options">
                            <Package className="mr-2 h-4 w-4" />
                            <span>Package Options</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    )}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            )}

            {isAdmin && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => toggleSubmenu("admin")}
                  isActive={isSubActive("/admin")}
                  tooltip="Admin"
                  className="justify-between"
                >
                  <div className="flex items-center">
                    <Settings className="mr-2" />
                    <span>Admin</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      activeSubmenu === "admin" ? "rotate-180" : ""
                    )}
                  />
                </SidebarMenuButton>

                {activeSubmenu === "admin" && (
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/admin/control-panel")}
                      >
                        <Link to="/admin/control-panel">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Control Panel</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton
                        asChild
                        isActive={isActive("/admin/register")}
                      >
                        <Link to="/admin/register">
                          <User className="mr-2 h-4 w-4" />
                          <span>Register User</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t border-border/40 p-4">
          {currentUser ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={currentUser.fullName} />
                  <AvatarFallback>{currentUser.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentUser.fullName}</span>
                  <span className="text-xs text-muted-foreground">
                    {isAdmin ? "Administrator" : "User"}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link to="/admin/login">
                <User className="mr-2 h-4 w-4" />
                <span>Log in</span>
              </Link>
            </Button>
          )}
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
