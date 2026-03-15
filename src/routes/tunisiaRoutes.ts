import { RouteConfig } from "./types";
import TunisiaProtectedDashboard from "@/pages/tunisia/TunisiaProtectedDashboard";
import TunisiaInvoiceDashboard from "@/pages/tunisia/TunisiaInvoiceDashboard";
import TunisiaAirManifest from "@/pages/tunisia/TunisiaAirManifest";
import TunisiaSeaManifest from "@/pages/tunisia/TunisiaSeaManifest";
import ViewSchedules from "@/pages/schedules/ViewSchedules";
import AuthPage from "@/pages/auth/AuthPage";

export const tunisiaRoutes: RouteConfig[] = [
  {
    path: "/tunisia",
    element: TunisiaProtectedDashboard,
    private: false
  },
  {
    path: "/tunisia/invoices",
    element: TunisiaInvoiceDashboard,
    private: true
  },
  {
    path: "/tunisia/schedules",
    element: ViewSchedules,
    private: true
  },
  {
    path: "/tunisia/invoice/add",
    element: TunisiaInvoiceDashboard,
    private: true
  },
  {
    path: "/tunisia/invoice/edit/:id",
    element: TunisiaInvoiceDashboard,
    private: true
  },
  {
    path: "/tunisia/manifest/air/:manifestId",
    element: TunisiaAirManifest,
    private: true
  },
  {
    path: "/tunisia/manifest/sea/:manifestId",
    element: TunisiaSeaManifest,
    private: true
  },
  {
    path: "/auth",
    element: AuthPage,
    private: false
  }
];
