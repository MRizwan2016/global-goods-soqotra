
import { RouteConfig } from "./types";
import Login from "@/pages/admin/Login";
import ForgotPassword from "@/pages/admin/ForgotPassword";
import ResetPassword from "@/pages/admin/ResetPassword";
import Register from "@/pages/admin/Register";

export const authRoutes: RouteConfig[] = [
  {
    path: "/login",
    element: Login,
    private: false
  },
  {
    path: "/forgot-password", 
    element: ForgotPassword,
    private: false
  },
  {
    path: "/reset-password",
    element: ResetPassword,
    private: false
  },
  {
    path: "/register",
    element: Register,
    private: false
  }
];
