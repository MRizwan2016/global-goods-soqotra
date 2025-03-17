
import ControlPanel from "@/pages/admin/ControlPanel";
import UserRegistration from "@/pages/admin/UserRegistration";
import { RouteConfig } from "./types";

export const adminRoutes: RouteConfig[] = [
  {
    path: "/admin/control-panel",
    element: <ControlPanel />,
    private: true
  },
  {
    path: "/admin/user-registration",
    element: <UserRegistration />,
    private: true
  }
];
