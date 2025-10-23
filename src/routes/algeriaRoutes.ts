import { RouteConfig } from "./types";
import AlgeriaDashboard from "@/pages/algeria/AlgeriaDashboard";
import AlgeriaPaymentTracker from "@/pages/algeria/components/AlgeriaPaymentTracker";
import AlgeriaVehicleRegistry from "@/pages/algeria/components/AlgeriaVehicleRegistry";

export const algeriaRoutes: RouteConfig[] = [
  {
    path: "/algeria",
    element: AlgeriaDashboard,
    private: true
  },
  {
    path: "/algeria/accounts",
    element: AlgeriaPaymentTracker,
    private: true
  },
  {
    path: "/algeria/vehicles",
    element: AlgeriaVehicleRegistry,
    private: true
  }
];
