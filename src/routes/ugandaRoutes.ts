
import { RouteConfig } from "./types";
import UgandaDashboard from "@/pages/uganda/UgandaDashboard";

export const ugandaRoutes: RouteConfig[] = [
  {
    path: "/uganda",
    element: UgandaDashboard,
    private: true
  }
];
