import { RouteConfig } from "./types";
import KenyaOpsDashboard from "@/pages/kenya-ops/KenyaOpsDashboard";
import KenyaInvoiceForm from "@/pages/kenya-ops/KenyaInvoiceForm";
import KenyaSavedInvoices from "@/pages/kenya-ops/KenyaSavedInvoices";
import KenyaCollectionDelivery from "@/pages/kenya-ops/KenyaCollectionDelivery";
import KenyaNewJob from "@/pages/kenya-ops/KenyaNewJob";
import KenyaPaymentReceipt from "@/pages/kenya-ops/KenyaPaymentReceipt";
import KenyaReconciliation from "@/pages/kenya-ops/KenyaReconciliation";
import ViewSchedules from "@/pages/schedules/ViewSchedules";

export const kenyaOpsRoutes: RouteConfig[] = [
  { path: "/kenya-ops", element: KenyaOpsDashboard, private: true },
  { path: "/kenya-ops/invoice/add", element: KenyaInvoiceForm, private: true },
  { path: "/kenya-ops/invoice/edit/:id", element: KenyaInvoiceForm, private: true },
  { path: "/kenya-ops/saved-invoices", element: KenyaSavedInvoices, private: true },
  { path: "/kenya-ops/collection-delivery", element: KenyaCollectionDelivery, private: true },
  { path: "/kenya-ops/new-job", element: KenyaNewJob, private: true },
  { path: "/kenya-ops/schedules", element: ViewSchedules, private: true },
  { path: "/kenya-ops/payment-receipt", element: KenyaPaymentReceipt, private: true },
  { path: "/kenya-ops/reconciliation", element: KenyaReconciliation, private: true },
];
