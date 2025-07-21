
import { RouteConfig } from "./types";
import EritreaDashboard from "@/pages/eritrea/EritreaDashboard";
import EritreaInvoiceForm from "@/pages/eritrea/EritreaInvoiceForm";

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
  }
];
