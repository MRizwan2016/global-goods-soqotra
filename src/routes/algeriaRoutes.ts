import { RouteConfig } from "./types";
import AlgeriaDashboard from "@/pages/algeria/AlgeriaDashboard";
import AlgeriaPaymentTracker from "@/pages/algeria/components/AlgeriaPaymentTracker";

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
  }
];
