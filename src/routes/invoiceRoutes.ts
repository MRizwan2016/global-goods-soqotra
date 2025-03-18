
import InvoiceList from "@/pages/invoicing/InvoiceList";
import InvoiceForm from "@/pages/invoicing/InvoiceForm";
import InvoicePrint from "@/pages/invoicing/InvoicePrint";
import { RouteConfig } from "./types";

export const invoiceRoutes: RouteConfig[] = [
  {
    path: "/data-entry/invoicing",
    element: InvoiceList,
    private: true
  },
  {
    path: "/data-entry/invoicing/new",
    element: InvoiceForm,
    private: true
  },
  {
    path: "/data-entry/invoicing/edit/:id",
    element: InvoiceForm,
    private: true
  },
  {
    path: "/data-entry/invoicing/print/:id",
    element: InvoicePrint,
    private: true
  }
];
