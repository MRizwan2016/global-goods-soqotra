
import { RouteConfig } from "./types";
import Login from "@/pages/admin/Login";
import ForgotPassword from "@/pages/admin/ForgotPassword";

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
  },
  {
    path: "/admin/forgot-password", 
    element: ForgotPassword,
    private: false
  }
];
