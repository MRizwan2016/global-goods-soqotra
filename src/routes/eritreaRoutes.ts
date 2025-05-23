
import { RouteConfig } from "./types";
import EritreaDashboard from "@/pages/eritrea/EritreaDashboard";

export const eritreaRoutes: RouteConfig[] = [
  {
    path: "/eritrea",
    element: EritreaDashboard,
    private: true
  }
];
