
import { RouteConfig } from "./types";
import PaymentsPage from "@/pages/accounts/PaymentsPage";
import AddInvoicePayment from "@/pages/accounts/AddInvoicePayment";
import PaymentMethodsPage from "@/pages/accounts/PaymentMethodsPage";
import ReconciliationPage from "@/pages/accounts/ReconciliationPage";
import AddPaymentPage from "@/pages/accounts/payment/AddPaymentPage";
import PaidInvoicesPage from "@/pages/accounts/payments/PaidInvoicesPage";

const accountsRoutes: RouteConfig[] = [
  {
    path: "accounts/payments",
    element: PaymentsPage,
    private: true
  },
  {
    path: "accounts/payments/add",
    element: AddInvoicePayment,
    private: true
  },
  {
    path: "accounts/payment/add",
    element: AddPaymentPage,
    private: true
  },
  {
    path: "accounts/payment-methods",
    element: PaymentMethodsPage,
    private: true,
    requiredFile: "paymentMethods"
  },
  {
    path: "accounts/reconciliation",
    element: ReconciliationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/payments/reconciliation",
    element: ReconciliationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/payments/paid",
    element: PaidInvoicesPage,
    private: true
  },
];

export default accountsRoutes;
