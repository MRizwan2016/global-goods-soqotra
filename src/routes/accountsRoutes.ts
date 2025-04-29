
import AddInvoicePayment from "@/pages/accounts/AddInvoicePayment";
import PaymentMethodsPage from "@/pages/accounts/PaymentMethodsPage";
import PaymentsPage from "@/pages/accounts/PaymentsPage";
import ReconciliationPage from "@/pages/accounts/ReconciliationPage";
import AddPaymentPage from "@/pages/accounts/payment/AddPaymentPage";
import PaidInvoicesPage from "@/pages/accounts/payments/PaidInvoicesPage";
import ReconciliationPage as PaymentReconciliation from "@/pages/accounts/payments/ReconciliationPage";
import ProfitLossPage from "@/pages/accounts/ProfitLossPage";

import { RouteConfig } from "./types";

const accountsRoutes: RouteConfig[] = [
  {
    path: "/accounts/payments",
    element: PaymentsPage,
    private: true,
    requiredPermission: "accounting"
  },
  {
    path: "/accounts/paid-invoices",
    element: PaidInvoicesPage,
    private: true,
    requiredPermission: "accounting"
  },
  {
    path: "/accounts/add-invoice-payment",
    element: AddInvoicePayment,
    private: true,
    requiredPermission: "accounting"
  },
  {
    path: "/accounts/payment-methods",
    element: PaymentMethodsPage,
    private: true,
    requiredPermission: "accounting"
  },
  {
    path: "/accounts/reconciliation",
    element: ReconciliationPage,
    private: true,
    requiredPermission: "accounting"
  },
  {
    path: "/accounts/payments/reconciliation",
    element: PaymentReconciliation,
    private: true,
    requiredPermission: "accounting"
  },
  {
    path: "/accounts/payment/add",
    element: AddPaymentPage,
    private: true,
    requiredPermission: "accounting"
  },
  {
    path: "/accounts/profit-loss",
    element: ProfitLossPage,
    private: true,
    requiredPermission: "accounting"
  }
];

export default accountsRoutes;
