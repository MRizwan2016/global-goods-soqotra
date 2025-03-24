
import { RouteConfig } from "./types";
import InvoiceForm from "@/pages/invoicing/InvoiceForm";
import InvoiceList from "@/pages/invoicing/InvoiceList";
import BillOfLadingForm from "@/pages/bill-of-lading/BillOfLadingForm";
import BillOfLadingList from "@/pages/bill-of-lading/BillOfLadingList";
import InvoicePrint from "@/pages/invoicing/InvoicePrint";

export const dataEntryRoutes: RouteConfig[] = [
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
  },
  {
    path: "/data-entry/invoicing",
    element: InvoiceList,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading/new",
    element: BillOfLadingForm,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading/edit",
    element: BillOfLadingForm,
    private: true
  },
  {
    path: "/data-entry/bill-of-lading",
    element: BillOfLadingList,
    private: true
  }
];
