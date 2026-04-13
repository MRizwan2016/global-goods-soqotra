import { RouteConfig } from "./types";
import SriLankaDashboard from "@/pages/sri-lanka/SriLankaDashboard";
import SriLankaInvoiceForm from "@/pages/sri-lanka/SriLankaInvoiceForm";
import SriLankaInvoicePrint from "@/pages/sri-lanka/SriLankaInvoicePrint";
import SriLankaAirManifestPage from "@/pages/sri-lanka/manifest/SriLankaAirManifestPage";
import SriLankaSeaManifestPage from "@/pages/sri-lanka/manifest/SriLankaSeaManifestPage";
import SriLankaCollectionDelivery from "@/pages/sri-lanka/SriLankaCollectionDelivery";
import SriLankaNewJob from "@/pages/sri-lanka/SriLankaNewJob";
import SriLankaPaymentReceipt from "@/pages/sri-lanka/SriLankaPaymentReceipt";
import SriLankaReconciliation from "@/pages/sri-lanka/SriLankaReconciliation";
import SriLankaVesselContainer from "@/pages/sri-lanka/SriLankaVesselContainer";
import SriLankaDownloads from "@/pages/sri-lanka/SriLankaDownloads";
import ViewSchedules from "@/pages/schedules/ViewSchedules";

export const sriLankaRoutes: RouteConfig[] = [
  {
    path: "/sri-lanka",
    element: SriLankaDashboard,
    private: true
  },
  {
    path: "/sri-lanka/schedules",
    element: ViewSchedules,
    private: true
  },
  {
    path: "/sri-lanka/invoice/add",
    element: SriLankaInvoiceForm,
    private: true
  },
  {
    path: "/sri-lanka/invoice/edit/:id",
    element: SriLankaInvoiceForm,
    private: true
  },
  {
    path: "/sri-lanka/invoice/print/:id",
    element: SriLankaInvoicePrint,
    private: true
  },
  {
    path: "/sri-lanka/manifest/air/:manifestId",
    element: SriLankaAirManifestPage,
    private: true
  },
  {
    path: "/sri-lanka/manifest/sea/:manifestId",
    element: SriLankaSeaManifestPage,
    private: true
  },
  {
    path: "/sri-lanka/collection-delivery",
    element: SriLankaCollectionDelivery,
    private: true
  },
  {
    path: "/sri-lanka/new-job",
    element: SriLankaNewJob,
    private: true
  },
  {
    path: "/sri-lanka/payment-receipt",
    element: SriLankaPaymentReceipt,
    private: true
  },
  {
    path: "/sri-lanka/reconciliation",
    element: SriLankaReconciliation,
    private: true
  },
  {
    path: "/sri-lanka/vessel-container",
    element: SriLankaVesselContainer,
    private: true
  },
  {
    path: "/sri-lanka/downloads",
    element: SriLankaDownloads,
    private: true
  }
];
