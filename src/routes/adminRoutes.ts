
import ControlPanel from "@/pages/admin/ControlPanel";
import UserRegistration from "@/pages/auth/UserRegistration";
import { RouteConfig } from "./types";

export const adminRoutes: RouteConfig[] = [
  {
    path: "/admin/panel",
    element: ControlPanel,
    private: true
  },
  {
    path: "/admin/control-panel", // Added this route
    element: ControlPanel,
    private: true
  },
  {
    path: "/register",
    element: UserRegistration,
    private: true
  }
];
