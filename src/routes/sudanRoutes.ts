
import { RouteConfig } from "./types";
import SudanDashboard from "@/pages/sudan/SudanDashboard";
import SudanInvoiceForm from "@/pages/sudan/SudanInvoiceForm";
import SudanInvoicePrint from "@/pages/sudan/SudanInvoicePrint";

export const sudanRoutes: RouteConfig[] = [
  {
    path: "/sudan",
    element: SudanDashboard,
    private: true
  },
  {
    path: "/sudan/invoice/add",
    element: SudanInvoiceForm,
    private: true
  },
  {
    path: "/sudan/invoice/edit/:id",
    element: SudanInvoiceForm,
    private: true
  },
  {
    path: "/sudan/invoice/print/:id",
    element: SudanInvoicePrint,
    private: true
  }
];
