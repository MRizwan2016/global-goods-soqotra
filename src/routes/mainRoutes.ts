
import Dashboard from "@/pages/Dashboard";
import DataEntry from "@/pages/DataEntry";
import NotFound from "@/pages/NotFound";
import Landing from "@/pages/Landing";
import DestinationWrapper from "@/pages/destinations/DestinationWrapper";
import { RouteConfig } from "./types";

export const mainRoutes: RouteConfig[] = [
  {
    path: "/",
    element: Landing,
    private: false
  },
  {
    path: "/dashboard",
    element: Dashboard,
    private: true
  },
  {
    path: "/data-entry",
    element: DataEntry,
    private: true
  },
  {
    path: "/destinations/:country",
    element: DestinationWrapper,
    private: true
  },
  {
    path: "*",
    element: NotFound,
    private: false
  }
];
