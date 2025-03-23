
import { dataEntryRoutes } from "./dataEntryRoutes";
import { masterDataRoutes } from "./masterDataRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { kenyaRoutes } from "./kenyaRoutes";
import { qatarRoutes } from "./qatarRoutes";
import { accountsRoutes } from "./accountsRoutes";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { RouteConfig } from "./types";
import Dashboard from "@/pages/Dashboard";

const appRoutes: RouteConfig[] = [
  {
    path: "/",
    element: Dashboard,
    private: true
  },
  {
    path: "/dashboard",
    element: Dashboard,
    private: true
  }
];

// Make sure the route for invoice printing is given a higher priority (placed earlier in the array)
// to avoid potential conflicts with the admin routes
export const routes: RouteConfig[] = [
  ...authRoutes,
  ...dataEntryRoutes,  // Move data entry routes earlier so the print route isn't conflicting
  ...appRoutes,
  ...masterDataRoutes,
  ...reportsRoutes,
  ...kenyaRoutes,
  ...qatarRoutes,
  ...accountsRoutes,
  ...adminRoutes,
];
