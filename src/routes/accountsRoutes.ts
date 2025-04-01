
import { RouteObject } from "react-router-dom";
import PaymentsPage from "@/pages/accounts/PaymentsPage";
import AddInvoicePayment from "@/pages/accounts/AddInvoicePayment";
import PaymentMethodsPage from "@/pages/accounts/PaymentMethodsPage";
import ReconciliationPage from "@/pages/accounts/ReconciliationPage";
import AddPaymentPage from "@/pages/accounts/payment/AddPaymentPage";
// Fix: Using a correct import path for PaidInvoicesPage
import PaidInvoicesPage from "@/pages/accounts/payments/PaidInvoicesPage";

const accountsRoutes: RouteObject[] = [
  {
    path: "payments",
    element: PaymentsPage,
  },
  {
    path: "payments/add",
    element: AddInvoicePayment,
  },
  {
    path: "payment/add",
    element: AddPaymentPage,
  },
  {
    path: "payment-methods",
    element: PaymentMethodsPage,
  },
  {
    path: "reconciliation",
    element: ReconciliationPage,
  },
  {
    path: "payments/reconciliation",
    element: ReconciliationPage,
  },
  {
    path: "payments/paid",
    element: PaidInvoicesPage,
  },
];

export default accountsRoutes;
