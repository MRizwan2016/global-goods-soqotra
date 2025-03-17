
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import DataEntry from "@/pages/DataEntry";
import NotFound from "@/pages/NotFound";
import { RouteConfig } from "./types";

export const mainRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Index />,
    private: true
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    private: true
  },
  {
    path: "/data-entry",
    element: <DataEntry />,
    private: true
  },
  {
    path: "*",
    element: <NotFound />,
    private: false
  }
];
