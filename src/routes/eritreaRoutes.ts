
import { RouteConfig } from "./types";
import EritreaDashboard from "@/pages/eritrea/EritreaDashboard";
import EritreaInvoiceForm from "@/pages/eritrea/EritreaInvoiceForm";
import EritreaInvoicePrint from "@/pages/eritrea/EritreaInvoicePrint";
import EritreaHBLPage from "@/pages/eritrea/EritreaHBLPage";

export const eritreaRoutes: RouteConfig[] = [
  {
    path: "/eritrea",
    element: EritreaDashboard,
    private: true
  },
  {
    path: "/eritrea/invoice/add",
    element: EritreaInvoiceForm,
    private: true
  },
  {
    path: "/eritrea/invoice/edit/:id",
    element: EritreaInvoiceForm,
    private: true
  },
  {
    path: "/eritrea/invoice/print/:id",
    element: EritreaInvoicePrint,
    private: true
  },
  {
    path: "/eritrea/hbl/generate",
    element: EritreaHBLPage,
    private: true
  }
];
