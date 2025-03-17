
import InvoiceList from "@/pages/invoicing/InvoiceList";
import InvoiceForm from "@/pages/invoicing/InvoiceForm";
import InvoicePrint from "@/pages/invoicing/InvoicePrint";
import InvoiceMethod from "@/pages/invoice-method/InvoiceMethod";
import BookingFormStock from "@/pages/invoicing/BookingFormStock";
import BookingFormActivate from "@/pages/invoicing/BookingFormActivate";
import BookingFormIssue from "@/pages/invoicing/BookingFormIssue";
import { RouteConfig } from "./types";

export const invoiceRoutes: RouteConfig[] = [
  {
    path: "/invoice",
    element: <InvoiceList />,
    private: true
  },
  {
    path: "/invoice/new",
    element: <InvoiceForm />,
    private: true
  },
  {
    path: "/invoice/edit",
    element: <InvoiceForm />,
    private: true
  },
  {
    path: "/invoice/print",
    element: <InvoicePrint />,
    private: true
  },
  {
    path: "/invoice/method/select",
    element: <InvoiceMethod />,
    private: true
  },
  {
    path: "/invoice/book/stock",
    element: <BookingFormStock />,
    private: true
  },
  {
    path: "/invoice/book/issue",
    element: <BookingFormIssue />,
    private: true
  }
];
