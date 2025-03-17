
import { RouteConfig } from "./types";
import { authRoutes } from "./authRoutes";
import { mainRoutes } from "./mainRoutes";
import { adminRoutes } from "./adminRoutes";
import { invoiceRoutes } from "./invoiceRoutes";
import { kenyaRoutes } from "./kenyaRoutes";
import { ladingRoutes } from "./ladingRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { accountsRoutes } from "./accountsRoutes";
import { masterRoutes } from "./masterRoutes";
import { sellingRatesRoutes } from "./sellingRatesRoutes";
import { printDocumentsRoutes } from "./printDocumentsRoutes";

// Combine all routes into a single array
export const routes: RouteConfig[] = [
  ...authRoutes,
  ...mainRoutes,
  ...adminRoutes,
  ...invoiceRoutes,
  ...kenyaRoutes,
  ...ladingRoutes,
  ...reportsRoutes,
  ...accountsRoutes,
  ...masterRoutes,
  ...sellingRatesRoutes,
  ...printDocumentsRoutes
];
