import { RouteConfig } from "./types";
import PhilippinesDashboard from "@/pages/philippines/PhilippinesDashboard";
import PhilippinesInvoiceForm from "@/pages/philippines/PhilippinesInvoiceForm";
import PhilippinesInvoicePrint from "@/pages/philippines/PhilippinesInvoicePrint";

export const philippinesRoutes: RouteConfig[] = [
  {
    path: "/philippines",
    element: PhilippinesDashboard,
    private: true
  },
  {
    path: "/philippines/invoice/add",
    element: PhilippinesInvoiceForm,
    private: true
  },
  {
    path: "/philippines/invoice/edit/:id",
    element: PhilippinesInvoiceForm,
    private: true
  },
  {
    path: "/philippines/invoice/print/:id",
    element: PhilippinesInvoicePrint,
    private: true
  }
];