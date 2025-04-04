
import { RouteConfig } from "./types";
import Login from "@/pages/admin/Login";

export const authRoutes: RouteConfig[] = [
  {
    path: "/admin/login",
    element: Login,
    private: false
  },
  {
    path: "/login",
    element: Login,
    private: false
  }
];
