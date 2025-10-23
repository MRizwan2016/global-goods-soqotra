
import { RouteConfig } from "./types";
import UgandaDashboard from "@/pages/uganda/UgandaDashboard";
import UgandaClearanceTracking from "@/pages/uganda/UgandaClearanceTracking";
import UgandaDeliveryTracking from "@/pages/uganda/UgandaDeliveryTracking";
import UgandaVehicleManagement from "@/pages/uganda/UgandaVehicleManagement";

export const ugandaRoutes: RouteConfig[] = [
  {
    path: "/uganda",
    element: UgandaDashboard,
    private: true
  },
  {
    path: "/uganda/clearance",
    element: UgandaClearanceTracking,
    private: true
  },
  {
    path: "/uganda/deliveries", 
    element: UgandaDeliveryTracking,
    private: true
  },
  {
    path: "/uganda/vehicles",
    element: UgandaVehicleManagement,
    private: true
  }
];
