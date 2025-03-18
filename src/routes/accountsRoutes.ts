
import AddInvoicePayment from "@/pages/accounts/AddInvoicePayment";
import PaymentMethodsPage from "@/pages/accounts/PaymentMethodsPage";
import ReconciliationPage from "@/pages/accounts/ReconciliationPage";
import PaymentsPage from "@/pages/accounts/PaymentsPage";
import { RouteConfig } from "./types";

export const accountsRoutes: RouteConfig[] = [
  {
    path: "/accounts/payment/add",
    element: AddInvoicePayment,
    private: true
  },
  {
    path: "/accounts/payment",
    element: PaymentsPage,
    private: true
  },
  {
    path: "/accounts/payment-methods",
    element: PaymentMethodsPage,
    private: true
  },
  {
    path: "/accounts/reconciliation",
    element: ReconciliationPage,
    private: true
  }
];
