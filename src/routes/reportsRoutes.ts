
import CargoReportsPage from "@/pages/reports/CargoReportsPage";
import FinancialReportsPage from "@/pages/reports/FinancialReportsPage";
import { RouteConfig } from "./types";

export const reportsRoutes: RouteConfig[] = [
  {
    path: "/reports/cargo",
    element: CargoReportsPage,
    private: true
  },
  {
    path: "/reports/financial",
    element: FinancialReportsPage,
    private: true
  }
];
