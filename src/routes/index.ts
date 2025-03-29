
import { dataEntryRoutes } from "./dataEntryRoutes";
import { masterDataRoutes } from "./masterDataRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { kenyaRoutes } from "./kenyaRoutes";
import { qatarRoutes } from "./qatarRoutes";
import { accountsRoutes } from "./accountsRoutes";
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

// Place printDocumentsRoutes and authRoutes higher in the order for better priority
export const routes: RouteConfig[] = [
  ...authRoutes,
  ...printDocumentsRoutes, // Give print documents routes higher priority
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
