
import { RouteConfig } from "./types";
import SyriaDashboard from "@/pages/syria/SyriaDashboard";

export const syriaRoutes: RouteConfig[] = [
  {
    path: "/syria",
    element: SyriaDashboard,
    private: true
  }
];
