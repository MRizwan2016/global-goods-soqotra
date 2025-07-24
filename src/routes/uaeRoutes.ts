import { RouteConfig } from "./types";
import UaeDashboard from "@/pages/uae/UaeDashboard";
import UaeInvoiceForm from "@/pages/uae/UaeInvoiceForm";
import UaeInvoicePrint from "@/pages/uae/UaeInvoicePrint";

export const uaeRoutes: RouteConfig[] = [
  {
    path: "/uae",
    element: UaeDashboard,
    private: true
  },
  {
    path: "/uae/invoice/add",
    element: UaeInvoiceForm,
    private: true
  },
  {
    path: "/uae/invoice/edit/:id",
    element: UaeInvoiceForm,
    private: true
  },
  {
    path: "/uae/invoice/print/:id",
    element: UaeInvoicePrint,
    private: true
  }
];