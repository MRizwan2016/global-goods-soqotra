
import { RouteConfig } from "./types";
import Login from "@/pages/auth/Login";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import ResetPassword from "@/pages/auth/ResetPassword";
import Register from "@/pages/auth/Register";

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
