import { RouteConfig } from "./types";
import SudanOpsDashboard from "@/pages/sudan/SudanOpsDashboard";
import SudanOpsInvoiceForm from "@/pages/sudan/SudanOpsInvoiceForm";
import SudanOpsSavedInvoices from "@/pages/sudan/SudanOpsSavedInvoices";
import SudanOpsCollectionDelivery from "@/pages/sudan/SudanOpsCollectionDelivery";
import SudanOpsNewJob from "@/pages/sudan/SudanOpsNewJob";
import SudanOpsPaymentReceipt from "@/pages/sudan/SudanOpsPaymentReceipt";
import SudanOpsReconciliation from "@/pages/sudan/SudanOpsReconciliation";
import SudanVesselContainer from "@/pages/sudan/SudanVesselContainer";
import ViewSchedules from "@/pages/schedules/ViewSchedules";

export const sudanRoutes: RouteConfig[] = [
  { path: "/sudan-ops", element: SudanOpsDashboard, private: true },
  { path: "/sudan-ops/invoice/add", element: SudanOpsInvoiceForm, private: true },
  { path: "/sudan-ops/invoice/edit/:id", element: SudanOpsInvoiceForm, private: true },
  { path: "/sudan-ops/saved-invoices", element: SudanOpsSavedInvoices, private: true },
  { path: "/sudan-ops/collection-delivery", element: SudanOpsCollectionDelivery, private: true },
  { path: "/sudan-ops/new-job", element: SudanOpsNewJob, private: true },
  { path: "/sudan-ops/schedules", element: ViewSchedules, private: true },
  { path: "/sudan-ops/payment-receipt", element: SudanOpsPaymentReceipt, private: true },
  { path: "/sudan-ops/reconciliation", element: SudanOpsReconciliation, private: true },
  { path: "/sudan-ops/vessel-container", element: SudanVesselContainer, private: true },
];
