
import { RouteConfig } from "./types";
import PaymentsPage from "@/pages/accounts/PaymentsPage";
import AddInvoicePayment from "@/pages/accounts/AddInvoicePayment";
import PaymentMethodsPage from "@/pages/accounts/PaymentMethodsPage";
import ReconciliationPage from "@/pages/accounts/ReconciliationPage";
import AddPaymentPage from "@/pages/accounts/payment/AddPaymentPage";
// Fix: Using a correct import path for PaidInvoicesPage
import PaidInvoicesPage from "@/pages/accounts/payments/PaidInvoicesPage";

const accountsRoutes: RouteConfig[] = [
  {
    path: "payments",
    element: PaymentsPage,
    private: true
  },
  {
    path: "payments/add",
    element: AddInvoicePayment,
    private: true
  },
  {
    path: "payment/add",
    element: AddPaymentPage,
    private: true
  },
  {
    path: "payment-methods",
    element: PaymentMethodsPage,
    private: true
  },
  {
    path: "reconciliation",
    element: ReconciliationPage,
    private: true
  },
  {
    path: "payments/reconciliation",
    element: ReconciliationPage,
    private: true
  },
  {
    path: "payments/paid",
    element: PaidInvoicesPage,
    private: true
  },
];

export default accountsRoutes;
