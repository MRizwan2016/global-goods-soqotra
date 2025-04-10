
import { RouteConfig } from "./types";
import CargoReports from "@/pages/reports/CargoReports";
import FinancialReports from "@/pages/reports/FinancialReports";
import CargoStatistics from "@/pages/reports/CargoStatistics";
import Shipments from "@/pages/reports/shipments/Shipments";

export const reportsRoutes: RouteConfig[] = [
  {
    path: "/reports/cargo",
    element: CargoReports,
    private: true
  },
  {
    path: "/reports/cargo/statistics",
    element: CargoStatistics,
    private: true
  },
  {
    path: "/reports/cargo/shipments",
    element: Shipments,
    private: true
  },
  {
    path: "/reports/financial",
    element: FinancialReports,
    private: true
  }
];
