
import Dashboard from "@/pages/Dashboard";
import DataEntry from "@/pages/DataEntry";
import NotFound from "@/pages/NotFound";
import Index from "@/pages/Index";
import { RouteConfig } from "./types";

export const mainRoutes: RouteConfig[] = [
  {
    path: "/",
    element: <Index />,
    private: false
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
