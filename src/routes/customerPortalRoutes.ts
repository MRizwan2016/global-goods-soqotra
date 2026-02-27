import { RouteConfig } from "./types";
import PortalLogin from "@/pages/customer-portal/PortalLogin";
import PortalRegister from "@/pages/customer-portal/PortalRegister";
import PortalDashboard from "@/pages/customer-portal/PortalDashboard";
import AdminCustomerManagement from "@/pages/customer-portal/AdminCustomerManagement";

export const customerPortalRoutes: RouteConfig[] = [
  {
    path: "/customer-portal",
    element: PortalLogin,
    private: false
  },
  {
    path: "/customer-portal/register",
    element: PortalRegister,
    private: false
  },
  {
    path: "/customer-portal/dashboard",
    element: PortalDashboard,
    private: false // Auth handled internally by the component
  },
  {
    path: "/customer-portal/admin",
    element: AdminCustomerManagement,
    private: true,
    requiredPermission: 'controlPanel'
  }
];
