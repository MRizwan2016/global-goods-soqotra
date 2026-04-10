
import ControlPanel from "@/pages/admin/ControlPanel";
import UserRegistration from "@/pages/auth/UserRegistration";
import VehicleMaintenance from "@/pages/admin/VehicleMaintenance";
import EmployeeLeaderboard from "@/pages/admin/EmployeeLeaderboard";
import { RouteConfig } from "./types";

export const adminRoutes: RouteConfig[] = [
  {
    path: "/admin/panel",
    element: ControlPanel,
    private: true
  },
  {
    path: "/admin/control-panel",
    element: ControlPanel,
    private: true
  },
  {
    path: "/admin/vehicle-maintenance",
    element: VehicleMaintenance,
    private: true,
    requiredPermission: "controlPanel"
  },
  {
    path: "/register",
    element: UserRegistration,
    private: true
  },
  {
    path: "/admin/employee-leaderboard",
    element: EmployeeLeaderboard,
    private: true,
    requiredPermission: "controlPanel"
  }
];
