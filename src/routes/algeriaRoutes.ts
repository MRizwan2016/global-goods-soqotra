import { RouteConfig } from "./types";
import AlgeriaDashboard from "@/pages/algeria/AlgeriaDashboard";

export const algeriaRoutes: RouteConfig[] = [
  {
    path: "/algeria",
    element: AlgeriaDashboard,
    private: true
  }
];
