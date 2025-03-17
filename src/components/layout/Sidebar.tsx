
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  ChevronDown,
  ClipboardList,
  Building2,
  Settings,
  LogOut,
  LayoutDashboard,
  Wallet,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { usePermissions } from "@/hooks/use-permissions";

const SidebarWrapper = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
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
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isSubActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-64 min-h-screen bg-sky-50 border-r border-sky-100 shadow-sm">
      <div className="flex flex-col h-full">
        {/* Sidebar Header with Logo */}
        <div className="p-4 border-b border-sky-200 animate-fade-in">
          <div className="flex flex-col items-center">
            <img 
              src="/lovable-uploads/056bd63a-3806-4e08-9360-0e3edff62199.png" 
              alt="Soqotra Logo" 
              className="h-14 mb-2 hover-scale"
            />
            <div className="text-center mt-1">
              <p className="text-xs font-semibold text-gray-800 leading-tight">SOQOTRA LOGISTICS SERVICES,</p>
              <p className="text-xs font-semibold text-gray-800 leading-tight">TRANSPORTATION & TRADING WLL</p>
            </div>
          </div>
        </div>
        
        {/* Sidebar Menu */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            <nav className="space-y-1 animate-fade-in">
              <Link 
                to="/" 
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-bold rounded-md transition-all duration-300 hover:scale-105 transform",
                  isActive("/") 
                    ? "bg-gradient-to-r from-green-200 to-green-100 text-green-800 shadow-sm" 
                    : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                )}
              >
                <LayoutDashboard className={cn("mr-3 h-5 w-5 animate-pulse", isActive("/") ? "text-green-700" : "text-gray-500")} />
                <span className="uppercase tracking-wide">Dashboard</span>
              </Link>
              
              {/* Data Entry submenu */}
              <div>
                <button
                  onClick={() => toggleSubmenu("data-entry")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-md transition-all duration-300 hover:scale-105 transform",
                    isSubActive("/data-entry") 
                      ? "bg-gradient-to-r from-blue-200 to-sky-100 text-blue-800 shadow-sm" 
                      : "text-gray-700 hover:bg-sky-50 hover:text-blue-700"
                  )}
                >
                  <div className="flex items-center">
                    <ClipboardList className={cn("mr-3 h-5 w-5", isSubActive("/data-entry") ? "text-blue-700" : "text-gray-500")} />
                    <span className="uppercase tracking-wide">Data Entry</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-500",
                      activeSubmenu === "data-entry" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {/* Data Entry subitems */}
                {activeSubmenu === "data-entry" && (
                  <div className="pl-10 mt-1 space-y-1 animate-accordion-down">
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
              
              {/* Accounts submenu */}
              <div>
                <button
                  onClick={() => toggleSubmenu("accounts")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-md transition-all duration-300 hover:scale-105 transform",
                    isSubActive("/accounts") 
                      ? "bg-gradient-to-r from-purple-200 to-purple-100 text-purple-800 shadow-sm" 
                      : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
                  )}
                >
                  <div className="flex items-center">
                    <Wallet className={cn("mr-3 h-5 w-5", isSubActive("/accounts") ? "text-purple-700" : "text-gray-500")} />
                    <span className="uppercase tracking-wide">Accounts</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-500",
                      activeSubmenu === "accounts" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {/* Accounts subitems */}
                {activeSubmenu === "accounts" && (
                  <div className="pl-10 mt-1 space-y-1 animate-accordion-down">
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
              
              {/* Reports submenu */}
              <div>
                <button
                  onClick={() => toggleSubmenu("reports")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-md transition-all duration-300 hover:scale-105 transform",
                    isSubActive("/reports") 
                      ? "bg-gradient-to-r from-amber-200 to-amber-100 text-amber-800 shadow-sm" 
                      : "text-gray-700 hover:bg-amber-50 hover:text-amber-700"
                  )}
                >
                  <div className="flex items-center">
                    <BarChart3 className={cn("mr-3 h-5 w-5", isSubActive("/reports") ? "text-amber-700" : "text-gray-500")} />
                    <span className="uppercase tracking-wide">Reports</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-500",
                      activeSubmenu === "reports" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {/* Reports subitems */}
                {activeSubmenu === "reports" && (
                  <div className="pl-10 mt-1 space-y-1 animate-accordion-down">
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
              
              {/* Master Data submenu */}
              <div>
                <button
                  onClick={() => toggleSubmenu("master")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-md transition-all duration-300 hover:scale-105 transform",
                    isSubActive("/master") 
                      ? "bg-gradient-to-r from-teal-200 to-teal-100 text-teal-800 shadow-sm" 
                      : "text-gray-700 hover:bg-teal-50 hover:text-teal-700"
                  )}
                >
                  <div className="flex items-center">
                    <Building2 className={cn("mr-3 h-5 w-5", isSubActive("/master") ? "text-teal-700" : "text-gray-500")} />
                    <span className="uppercase tracking-wide">Master Data</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-500",
                      activeSubmenu === "master" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {/* Master Data subitems */}
                {activeSubmenu === "master" && (
                  <div className="pl-10 mt-1 space-y-1 animate-accordion-down">
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
              
              {/* Admin submenu */}
              <div>
                <button
                  onClick={() => toggleSubmenu("admin")}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold rounded-md transition-all duration-300 hover:scale-105 transform",
                    isSubActive("/admin") 
                      ? "bg-gradient-to-r from-rose-200 to-rose-100 text-rose-800 shadow-sm" 
                      : "text-gray-700 hover:bg-rose-50 hover:text-rose-700"
                  )}
                >
                  <div className="flex items-center">
                    <Settings className={cn("mr-3 h-5 w-5", isSubActive("/admin") ? "text-rose-700" : "text-gray-500")} />
                    <span className="uppercase tracking-wide">Admin</span>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-500",
                      activeSubmenu === "admin" ? "rotate-180" : ""
                    )}
                  />
                </button>
                
                {/* Admin subitems */}
                {activeSubmenu === "admin" && (
                  <div className="pl-10 mt-1 space-y-1 animate-accordion-down">
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
        <div className="p-4 border-t border-sky-200 bg-gradient-to-r from-sky-50 to-green-50">
          {currentUser ? (
            <div className="flex flex-col space-y-3 animate-fade-in">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-soqotra-green flex items-center justify-center text-white font-medium mr-3 hover-scale shadow-sm">
                  {currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{currentUser.fullName || 'User'}</span>
                  <span className="text-xs text-gray-500">{currentUser.isAdmin ? 'Administrator' : 'User'}</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-rose-600 transition-colors duration-300 hover-scale group"
              >
                <LogOut className="mr-2 h-4 w-4 group-hover:rotate-[-15deg] transition-transform duration-300" />
                Log out
              </button>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors duration-300 hover-scale group"
            >
              <LogOut className="mr-2 h-4 w-4 group-hover:rotate-[-15deg] transition-transform duration-300" />
              Log in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarWrapper;
