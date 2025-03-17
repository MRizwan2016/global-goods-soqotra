
import InvoiceList from "@/pages/invoicing/InvoiceList";
import InvoiceForm from "@/pages/invoicing/InvoiceForm";
import InvoicePrint from "@/pages/invoicing/InvoicePrint";
import BookingFormActivate from "@/pages/invoicing/BookingFormActivate";
import BookingFormIssue from "@/pages/invoicing/BookingFormIssue";
import BookingFormStock from "@/pages/invoicing/BookingFormStock";
import { RouteConfig } from "./types";

export const invoiceRoutes: RouteConfig[] = [
  {
    path: "/data-entry/invoicing",
    element: <InvoiceList />,
    private: true
  },
  {
    path: "/data-entry/invoicing/new",
    element: <InvoiceForm />,
    private: true
  },
  {
    path: "/data-entry/invoicing/edit/:id",
    element: <InvoiceForm />,
    private: true
  },
  {
    path: "/data-entry/invoicing/print/:id",
    element: <InvoicePrint />,
    private: true
  },
  {
    path: "/data-entry/invoicing/book/activate",
    element: <BookingFormActivate />,
    private: true
  },
  {
    path: "/data-entry/invoicing/book/issue",
    element: <BookingFormIssue />,
    private: true
  },
  {
    path: "/data-entry/invoicing/book/stock",
    element: <BookingFormStock />,
    private: true
  }
];
