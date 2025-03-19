
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Database, DollarSign, Settings, Truck, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const sections = {
  upb: {
    title: "UPB",
    icon: Database,
    color: "from-green-200 to-green-100 text-green-800 border-green-300 hover:bg-green-50",
    iconColor: "text-green-700",
    submenu: [
      {
        title: "Data Entry",
        items: [
          { name: "Invoicing", path: "/data-entry/invoicing" },
          { name: "Payment Receivable", path: "/data-entry/payment-receivable" },
          { name: "Booking Form Stock", path: "/data-entry/booking-form-stock" },
          { name: "Selling Rates", path: "/data-entry/selling-rates" },
          { name: "Bill of Lading", path: "/data-entry/bill-of-lading" },
          { name: "Print Documents", path: "/data-entry/print-documents" },
        ],
      },
      {
        title: "Reports",
        items: [
          { name: "Financial Reports", path: "/reports/financial" },
          { name: "Cargo Reports", path: "/reports/cargo" },
        ],
      },
      {
        title: "Master Data",
        items: [
          { name: "Invoice Book", path: "/master/book/stock" },
          { name: "Sales Rep", path: "/master/salesrep/list" },
          { name: "Town", path: "/master/town" },
          { name: "Package Options", path: "/master/package/list" },
        ],
      },
    ],
  },
  accounts: {
    title: "Accounts",
    icon: DollarSign,
    color: "from-purple-200 to-purple-100 text-purple-800 border-purple-300 hover:bg-purple-50",
    iconColor: "text-purple-700",
    submenu: [
      {
        title: "Functions",
        items: [
          { name: "Payments", path: "/accounts/payment" },
          { name: "Reconciliation", path: "/accounts/reconciliation" },
        ],
      },
    ],
  },
  admin: {
    title: "Admin",
    icon: Settings,
    color: "from-rose-200 to-rose-100 text-rose-800 border-rose-300 hover:bg-rose-50",
    iconColor: "text-rose-700",
    submenu: [
      {
        title: "Control Panel",
        items: [
          { name: "Control Panel", path: "/admin/control-panel" },
          { name: "Register User", path: "/admin/register" },
        ],
      },
    ],
  },
  cargo: {
    title: "Cargo Collection & Delivery",
    icon: Truck,
    color: "from-sky-200 to-sky-100 text-sky-800 border-sky-300 hover:bg-sky-50",
    iconColor: "text-sky-700",
    submenu: [
      {
        title: "Kenya",
        items: [
          { name: "Dashboard", path: "/kenya/dashboard" },
          { name: "New Delivery", path: "/kenya/new-delivery" },
          { name: "Delivery Tracking", path: "/kenya/delivery-tracking" },
        ],
      },
    ],
  },
};

const MainNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const isPathActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-full p-4 animate-fade-in">
      <div className="flex justify-center mb-6">
        <img 
          src="/lovable-uploads/056bd63a-3806-4e08-9360-0e3edff62199.png" 
          alt="Soqotra Logo" 
          className="h-16 hover-scale"
        />
      </div>
      <div className="text-center mb-6">
        <p className="font-semibold text-sm text-gray-800 leading-tight">SOQOTRA LOGISTICS SERVICES,</p>
        <p className="font-semibold text-sm text-gray-800 leading-tight">TRANSPORTATION & TRADING WLL</p>
      </div>
      
      <NavigationMenu orientation="vertical" className="w-full max-w-none">
        <NavigationMenuList className="flex flex-col space-y-2 w-full">
          {Object.entries(sections).map(([key, section]) => (
            <NavigationMenuItem key={key} className="w-full">
              <Button
                variant="ghost"
                className={cn(
                  "justify-between w-full px-4 py-3 border rounded-md transition-all duration-300 hover:scale-105 bg-gradient-to-r",
                  section.color,
                  activeSection === key ? "shadow-md" : ""
                )}
                onClick={() => setActiveSection(activeSection === key ? null : key)}
              >
                <div className="flex items-center">
                  <section.icon className={cn("mr-3 h-5 w-5", section.iconColor)} />
                  <span className="font-bold">{section.title}</span>
                </div>
                {activeSection === key ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </Button>
              
              {activeSection === key && (
                <div className="ml-8 mt-2 space-y-4 animate-accordion-down">
                  {section.submenu.map((menu, index) => (
                    <div key={index} className="space-y-1">
                      <h4 className="font-medium text-sm text-gray-700 px-2">{menu.title}</h4>
                      <ul className="space-y-1">
                        {menu.items.map((item, idx) => (
                          <li key={idx}>
                            <button
                              onClick={() => handleNavigate(item.path)}
                              className={cn(
                                "w-full text-left px-4 py-2 text-sm rounded-md transition-colors",
                                isPathActive(item.path)
                                  ? "bg-gray-100 font-medium"
                                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              )}
                            >
                              {item.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default MainNavigation;
