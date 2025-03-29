
import AddInvoicePayment from "@/pages/accounts/AddInvoicePayment";
import PaymentMethodsPage from "@/pages/accounts/PaymentMethodsPage";
import ReconciliationPage from "@/pages/accounts/ReconciliationPage";
import PaymentsPage from "@/pages/accounts/PaymentsPage";
import AddPaymentPage from "@/pages/accounts/payment/AddPaymentPage";
import { RouteConfig } from "./types";

export const accountsRoutes: RouteConfig[] = [
  {
    path: "/accounts/add-payment",
    element: AddInvoicePayment,
    private: true,
    requiredFile: "paymentMethods"
  },
  {
    path: "/accounts/payment/add",
    element: AddPaymentPage,
    private: true
  },
  {
    path: "/accounts/payments",
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
