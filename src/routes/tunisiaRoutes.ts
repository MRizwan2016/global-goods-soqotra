
import { RouteConfig } from "./types";
import TunisiaDashboard from "@/pages/tunisia/TunisiaDashboard";

export const tunisiaRoutes: RouteConfig[] = [
  {
    path: "/tunisia",
    element: TunisiaDashboard,
    private: true
  }
];
