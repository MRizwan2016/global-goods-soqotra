
import { dataEntryRoutes } from "./dataEntryRoutes";
import { masterDataRoutes } from "./masterDataRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { kenyaRoutes } from "./kenyaRoutes";
import { qatarRoutes } from "./qatarRoutes";
import { accountsRoutes } from "./accountsRoutes";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { printDocumentsRoutes } from "./printDocumentsRoutes";
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
  ...printDocumentsRoutes, // Add print documents routes with high priority
  ...dataEntryRoutes,  
  ...appRoutes,
  ...masterDataRoutes,
  ...reportsRoutes,
  ...kenyaRoutes,
  ...qatarRoutes,
  ...accountsRoutes,
  ...adminRoutes,
];
