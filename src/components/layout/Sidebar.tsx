
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Leaf,
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
    <div className="w-64 min-h-screen bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {/* Sidebar Header with Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col items-center">
            <img 
              src="/soqotra-logo.png" 
              alt="Soqotra Logo" 
              className="h-14 mb-2"
            />
            <div className="text-center">
              <h1 className="text-lg font-bold tracking-tight text-black">SOQOTRA</h1>
              <p className="text-xs text-gray-600">LOGISTICS SERVICES AND TRADING</p>
            </div>
          </div>
        </div>
        
        {/* Sidebar Menu */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            <nav className="space-y-1">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                  isActive("/") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              
              <div>
                <button
                  onClick={() => toggleSubmenu("data-entry")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md",
                    isSubActive("/data-entry") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center">
                    <ClipboardList className="mr-3 h-5 w-5" />
                    Data Entry
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeSubmenu === "data-entry" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {activeSubmenu === "data-entry" && (
                  <div className="pl-10 mt-1 space-y-1">
                    <Link
                      to="/data-entry/invoicing"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/data-entry/invoicing") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Invoicing
                    </Link>
                    <Link
                      to="/data-entry/payment-receivable"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/data-entry/payment-receivable") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Payment Receivable
                    </Link>
                    <Link
                      to="/data-entry/booking-form-stock"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/data-entry/booking-form-stock") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Booking Form Stock
                    </Link>
                    <Link
                      to="/data-entry/selling-rates"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/data-entry/selling-rates") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Selling Rates
                    </Link>
                    <Link
                      to="/data-entry/bill-of-lading"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/data-entry/bill-of-lading") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Bill of Lading
                    </Link>
                    <Link
                      to="/data-entry/print-documents"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/data-entry/print-documents") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Print Documents
                    </Link>
                  </div>
                )}
              </div>
              
              <div>
                <button
                  onClick={() => toggleSubmenu("accounts")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md",
                    isSubActive("/accounts") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center">
                    <Wallet className="mr-3 h-5 w-5" />
                    Accounts
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeSubmenu === "accounts" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {activeSubmenu === "accounts" && (
                  <div className="pl-10 mt-1 space-y-1">
                    <Link
                      to="/accounts/payments"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/accounts/payments") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Payments
                    </Link>
                    <Link
                      to="/accounts/reconciliation"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/accounts/reconciliation") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Reconciliation
                    </Link>
                  </div>
                )}
              </div>
              
              <div>
                <button
                  onClick={() => toggleSubmenu("reports")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md",
                    isSubActive("/reports") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center">
                    <BarChart3 className="mr-3 h-5 w-5" />
                    Reports
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeSubmenu === "reports" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {activeSubmenu === "reports" && (
                  <div className="pl-10 mt-1 space-y-1">
                    <Link
                      to="/reports/financial"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/reports/financial") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Financial Reports
                    </Link>
                    <Link
                      to="/reports/cargo"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/reports/cargo") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Cargo Reports
                    </Link>
                  </div>
                )}
              </div>
              
              <div>
                <button
                  onClick={() => toggleSubmenu("master")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md",
                    isSubActive("/master") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center">
                    <Building2 className="mr-3 h-5 w-5" />
                    Master Data
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeSubmenu === "master" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {activeSubmenu === "master" && (
                  <div className="pl-10 mt-1 space-y-1">
                    {/* Master Data subitems */}
                    <Link
                      to="/master/invoice-book"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/master/invoice-book") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Invoice Book
                    </Link>
                    <Link
                      to="/master/sales-rep"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/master/sales-rep") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Sales Rep
                    </Link>
                    <Link
                      to="/master/town"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/master/town") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Town
                    </Link>
                    <Link
                      to="/master/package-options"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/master/package-options") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Package Options
                    </Link>
                  </div>
                )}
              </div>
              
              <div>
                <button
                  onClick={() => toggleSubmenu("admin")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md",
                    isSubActive("/admin") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <div className="flex items-center">
                    <Settings className="mr-3 h-5 w-5" />
                    Admin
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      activeSubmenu === "admin" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {activeSubmenu === "admin" && (
                  <div className="pl-10 mt-1 space-y-1">
                    <Link
                      to="/admin/control-panel"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/admin/control-panel") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Control Panel
                    </Link>
                    <Link
                      to="/admin/register"
                      className={cn(
                        "block px-3 py-2 text-sm rounded-md",
                        isActive("/admin/register") ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      Register User
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </ScrollArea>
        
        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200">
          {currentUser ? (
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium mr-3">
                  {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentUser.fullName || 'User'}</span>
                  <span className="text-xs text-gray-500">Administrator</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <User className="mr-2 h-4 w-4" />
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarWrapper;
