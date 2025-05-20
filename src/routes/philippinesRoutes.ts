
import { RouteConfig } from "./types";
import PhilippinesDashboard from "@/pages/philippines/PhilippinesDashboard";

export const philippinesRoutes: RouteConfig[] = [
  {
    path: "/philippines",
    element: PhilippinesDashboard,
    private: true
  }
];
