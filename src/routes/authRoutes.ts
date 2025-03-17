
import Login from "@/pages/admin/Login";
import { RouteConfig } from "./types";

export const authRoutes: RouteConfig[] = [
  {
    path: "/admin/login",
    element: <Login />,
    private: false
  }
];
