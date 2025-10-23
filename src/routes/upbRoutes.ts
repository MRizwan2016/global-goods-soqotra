import { RouteConfig } from "./types";
import UPBDashboard from "@/pages/upb/UPBDashboard";
import UPBInvoiceForm from "@/pages/upb/UPBInvoiceForm";
import UPBInvoicePrint from "@/pages/upb/UPBInvoicePrint";

export const upbRoutes: RouteConfig[] = [
  {
    path: "/upb",
    element: UPBDashboard,
    private: true
  },
  {
    path: "/upb/invoice/add",
    element: UPBInvoiceForm,
    private: true
  },
  {
    path: "/upb/invoice/edit/:id",
    element: UPBInvoiceForm,
    private: true
  },
  {
    path: "/upb/invoice/print/:id",
    element: UPBInvoicePrint,
    private: true
  }
];