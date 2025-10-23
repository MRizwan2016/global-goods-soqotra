
import { RouteConfig } from "./types";
import EthiopiaDashboard from "@/pages/ethiopia/EthiopiaDashboard";

export const ethiopiaRoutes: RouteConfig[] = [
  {
    path: "/ethiopia",
    element: EthiopiaDashboard,
    private: true
  }
];
