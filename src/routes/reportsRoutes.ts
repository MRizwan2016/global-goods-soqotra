
import CargoReports from "@/pages/reports/CargoReports";
import CargoReportsPage from "@/pages/reports/CargoReportsPage";
import CargoStatistics from "@/pages/reports/CargoStatistics";
import FinancialReports from "@/pages/reports/FinancialReports";
import FinancialReportsPage from "@/pages/reports/FinancialReportsPage";
import { InvoiceDetailsView } from "@/components/reports/InvoiceDetailsView";
import SalesRepReport from "@/pages/reports/SalesRepReport";
import { RouteConfig } from "./types";

export const reportsRoutes: RouteConfig[] = [
  {
    path: "/reports/cargo",
    element: CargoReportsPage,
    private: true,
  },
  {
    path: "/reports/cargo-statistics",
    element: CargoStatistics,
    private: true,
  },
  {
    path: "/reports/cargo/:section",
    element: CargoReports,
    private: true,
  },
  {
    path: "/reports/cargo/invoice/:id",
    element: InvoiceDetailsView,
    private: true,
  },
  {
    path: "/reports/financial",
    element: FinancialReportsPage,
    private: true,
  },
  {
    path: "/reports/financial/:section",
    element: FinancialReports,
    private: true,
  },
  {
    path: "/reports/sales-rep",
    element: SalesRepReport,
    private: true,
  }
];
