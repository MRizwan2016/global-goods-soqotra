
import PaymentReceivable from "@/pages/invoice-method/PaymentReceivable";
import BookingFormStock from "@/pages/invoice-method/BookingFormStock";
import { RouteConfig } from "./types";

export const paymentReceivableRoutes: RouteConfig[] = [
  {
    path: "/data-entry/payment-receivable",
    element: PaymentReceivable,
    private: true
  },
  {
    path: "/data-entry/booking-form-stock",
    element: BookingFormStock,
    private: true
  }
];
