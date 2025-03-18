
import PrintDocuments from "@/pages/print-documents/PrintDocuments";
import InvoicePrint from "@/pages/invoicing/InvoicePrint";
import BillOfLadingPrint from "@/pages/print-documents/BillOfLadingPrint";
import { RouteConfig } from "./types";

export const printDocumentsRoutes: RouteConfig[] = [
  {
    path: "/data-entry/print-documents",
    element: PrintDocuments,
    private: true
  },
  {
    path: "/data-entry/print-documents/invoice-print/:id",
    element: InvoicePrint,
    private: true
  },
  {
    path: "/data-entry/print-documents/bl-print/:id",
    element: InvoicePrint, // Reusing InvoicePrint for now as a fallback
    private: true
  }
];
