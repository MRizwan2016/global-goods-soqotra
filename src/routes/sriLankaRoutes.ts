
import { RouteConfig } from "./types";
import SriLankaDashboard from "@/pages/sri-lanka/SriLankaDashboard";

export const sriLankaRoutes: RouteConfig[] = [
  {
    path: "/sri-lanka",
    element: SriLankaDashboard,
    private: true
  }
];
