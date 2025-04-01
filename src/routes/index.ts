
import { dataEntryRoutes } from "./dataEntryRoutes";
import { masterDataRoutes } from "./masterDataRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { kenyaRoutes } from "./kenyaRoutes";
import { qatarRoutes } from "./qatarRoutes";
// Fix: Correcting the import to use default export
import accountsRoutes from "./accountsRoutes";
import { adminRoutes } from "./adminRoutes";
import { authRoutes } from "./authRoutes";
import { printDocumentsRoutes } from "./printDocumentsRoutes";
import { mainRoutes } from "./mainRoutes";
import { paymentReceivableRoutes } from "./paymentReceivableRoutes";
import { RouteConfig } from "./types";
import Dashboard from "@/pages/Dashboard";

const appRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: Dashboard,
    private: true
  }
];

// Place printDocumentsRoutes at the very top to give them the highest priority
export const routes: RouteConfig[] = [
  ...printDocumentsRoutes, // Highest priority for print routes
  ...authRoutes,
  ...mainRoutes,
  ...dataEntryRoutes,  
  ...appRoutes,
  ...masterDataRoutes,
  ...reportsRoutes,
  ...kenyaRoutes,
  ...qatarRoutes,
  ...accountsRoutes,
  ...adminRoutes,
  ...paymentReceivableRoutes,
];
