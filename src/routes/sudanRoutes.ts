
import { RouteConfig } from "./types";
import SudanDashboard from "@/pages/sudan/SudanDashboard";

export const sudanRoutes: RouteConfig[] = [
  {
    path: "/sudan",
    element: SudanDashboard,
    private: true
  }
];
