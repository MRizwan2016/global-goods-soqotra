
import PrintDocuments from "@/pages/print-documents/PrintDocuments";
import { RouteConfig } from "./types";

export const printDocumentsRoutes: RouteConfig[] = [
  {
    path: "/print-documents",
    element: PrintDocuments,
    private: true
  },
  {
    path: "/data-entry/print-documents", // Add this route
    element: PrintDocuments,
    private: true
  }
];
