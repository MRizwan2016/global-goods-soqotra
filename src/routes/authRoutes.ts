
import { RouteConfig } from "./types";
import Login from "@/pages/admin/Login";

export const authRoutes: RouteConfig[] = [
  {
    path: "/login",
    element: Login,
    private: false
  }
];
