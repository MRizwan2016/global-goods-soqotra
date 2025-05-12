
import { RouteConfig } from "./types";
import InvoiceList from "@/pages/invoicing/InvoiceList";
import InvoiceForm from "@/pages/invoicing/InvoiceForm";
import BookingFormStock from "@/pages/invoice-method/BookingFormStock";
import PaymentReceivable from "@/pages/invoice-method/PaymentReceivable";
import BillOfLadingList from "@/pages/bill-of-lading/BillOfLadingList";
import BillOfLadingForm from "@/pages/bill-of-lading/BillOfLadingForm";
import PrintDocuments from "@/pages/print-documents/PrintDocuments";

export const dataEntryRoutes: RouteConfig[] = [
  {
    path: "/data-entry/invoicing",
    element: InvoiceList,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/invoicing/new",
    element: InvoiceForm,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/invoicing/edit/:id",
    element: InvoiceForm,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/booking-form-stock",
    element: BookingFormStock,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/payment-receivable",
    element: PaymentReceivable,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/bill-of-lading",
    element: BillOfLadingList,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/bill-of-lading/new",
    element: BillOfLadingForm,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/bill-of-lading/edit/:id",
    element: BillOfLadingForm,
    private: true,
    requiredPermission: "dataEntry"
  },
  {
    path: "/data-entry/print-documents",
    element: PrintDocuments,
    private: true,
    requiredPermission: "dataEntry"
  }
];
