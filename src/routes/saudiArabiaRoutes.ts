
import { RouteConfig } from "./types";
import SaudiArabiaDashboard from "@/pages/saudi-arabia/SaudiArabiaDashboard";

export const saudiArabiaRoutes: RouteConfig[] = [
  {
    path: "/saudi-arabia",
    element: SaudiArabiaDashboard,
    private: true
  }
];
