
import { adminRoutes } from "./adminRoutes";
import { dataEntryRoutes } from "./dataEntryRoutes";
import accountsRoutes from "./accountsRoutes"; 
import { kenyaRoutes } from "./kenyaRoutes";
import { qatarRoutes } from "./qatarRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { printDocumentsRoutes } from "./printDocumentsRoutes";
import { paymentReceivableRoutes } from "./paymentReceivableRoutes";
import { authRoutes } from "./authRoutes";
import { masterRoutes } from "./masterRoutes";
import { RouteConfig } from "./types";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import Landing from "@/pages/Landing";

const baseRoutes: RouteConfig[] = [
  {
    path: "/",
    element: Index,
    private: false
  },
  {
    path: "/landing",
    element: Landing,
    private: false
  },
  {
    path: "/dashboard",
    element: Dashboard,
    private: true
  },
  {
    path: "*",
    element: NotFound,
    private: false
  }
];

export const routes: RouteConfig[] = [
  ...baseRoutes,
  ...adminRoutes,
  ...authRoutes,
  ...dataEntryRoutes,
  ...accountsRoutes,
  ...kenyaRoutes,
  ...qatarRoutes,
  ...reportsRoutes,
  ...printDocumentsRoutes,
  ...paymentReceivableRoutes,
  ...masterRoutes
];
