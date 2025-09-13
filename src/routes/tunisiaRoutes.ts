import { RouteConfig } from "./types";
import TunisiaProtectedDashboard from "@/pages/tunisia/TunisiaProtectedDashboard";
import AuthPage from "@/pages/auth/AuthPage";

export const tunisiaRoutes: RouteConfig[] = [
  {
    path: "/tunisia",
    element: TunisiaProtectedDashboard,
    private: false // We handle auth internally
  },
  {
    path: "/auth",
    element: AuthPage,
    private: false
  }
];