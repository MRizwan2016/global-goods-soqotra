
import { RouteConfig } from "./types";
import Login from "@/pages/admin/Login";
import ForgotPassword from "@/pages/admin/ForgotPassword";
import ResetPassword from "@/pages/admin/ResetPassword";
import Register from "@/pages/admin/Register";

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
  },
  {
    path: "/admin/reset-password",
    element: ResetPassword,
    private: false
  },
  {
    path: "/admin/register",
    element: Register,
    private: false
  }
];
