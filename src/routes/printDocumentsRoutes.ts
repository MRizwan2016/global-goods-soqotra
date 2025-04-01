
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
    private: false // Set to false to ensure it doesn't require auth checks that might fail
  },
  {
    path: "/data-entry/print-documents/bl-print/:id",
    element: BillOfLadingPrint,
    private: false // Set to false to ensure it doesn't require auth checks that might fail
  }
];
