
import KenyaDashboard from "@/pages/kenya/KenyaDashboard";
import KenyaDeliveryTracking from "@/pages/kenya/KenyaDeliveryTracking";
import DeliveryDetails from "@/pages/kenya/DeliveryDetails";
import NewDeliveryForm from "@/pages/kenya/NewDeliveryForm";
import VehicleManagement from "@/pages/kenya/VehicleManagement";
import DriverManagement from "@/pages/kenya/DriverManagement";
import KenyaFinancialSystem from "@/pages/kenya/KenyaFinancialSystem";
import StaffTestingPage from "@/pages/kenya/StaffTestingPage";
import KenyaCustomerPortal from "@/pages/kenya/KenyaCustomerPortal";
import { RouteConfig } from "./types";

export const kenyaRoutes: RouteConfig[] = [
  {
    path: "/kenya",
    element: KenyaDashboard,
    private: true
  },
  {
    path: "/kenya/deliveries",
    element: KenyaDeliveryTracking,
    private: true
  },
  {
    path: "/kenya/delivery/:id",
    element: DeliveryDetails,
    private: true
  },
  {
    path: "/kenya/delivery/new",
    element: NewDeliveryForm,
    private: true
  },
  {
    path: "/kenya/vehicles",
    element: VehicleManagement,
    private: true
  },
  {
    path: "/kenya/drivers",
    element: DriverManagement,
    private: true
  },
  {
    path: "/kenya/finance",
    element: KenyaFinancialSystem,
    private: true
  },
  {
    path: "/kenya/testing",
    element: StaffTestingPage,
    private: true
  },
  {
    path: "/kenya/customer-portal",
    element: KenyaCustomerPortal,
    private: false
  }
];
