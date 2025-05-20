
import { RouteConfig } from "./types";
import SomaliaDashboard from "@/pages/somalia/SomaliaDashboard";

export const somaliaRoutes: RouteConfig[] = [
  {
    path: "/somalia",
    element: SomaliaDashboard,
    private: true
  }
];
