
import { adminRoutes } from "./adminRoutes";
import { dataEntryRoutes } from "./dataEntryRoutes";
import { accountsRoutes } from "./accountsRoutes";
import { destinationRoutes } from "./destinationRoutes";
import { qaRoutes } from "./qaRoutes";
import { uaeRoutes } from "./uaeRoutes";
import { kenyaRoutes } from "./kenyaRoutes";
import { reportsRoutes } from "./reportsRoutes";
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
  ...dataEntryRoutes,
  ...accountsRoutes,
  ...destinationRoutes,
  ...qaRoutes,
  ...uaeRoutes,
  ...kenyaRoutes,
  ...reportsRoutes
];
