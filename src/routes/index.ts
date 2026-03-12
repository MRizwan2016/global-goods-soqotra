
import { adminRoutes } from "./adminRoutes";
import { dataEntryRoutes } from "./dataEntryRoutes";
import accountsRoutes from "./accountsRoutes"; 
import reconciliationRoutes from "./reconciliationRoutes";
import { kenyaRoutes } from "./kenyaRoutes";
import { qatarRoutes } from "./qatarRoutes";
import { ugandaRoutes } from "./ugandaRoutes";
import { sriLankaRoutes } from "./sriLankaRoutes";
import { philippinesRoutes } from "./philippinesRoutes";
import { tunisiaRoutes } from "./tunisiaRoutes";
import { algeriaRoutes } from "./algeriaRoutes";
import { somaliaRoutes } from "./somaliaRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { printDocumentsRoutes } from "./printDocumentsRoutes";
import { paymentReceivableRoutes } from "./paymentReceivableRoutes";
import { authRoutes } from "./authRoutes";
import { masterRoutes } from "./masterRoutes";
import { sellingRatesRoutes } from "./sellingRatesRoutes";
import { invoiceRoutes } from "./invoiceRoutes";
import { syriaRoutes } from "./syriaRoutes";
import { saudiArabiaRoutes } from "./saudiArabiaRoutes";
import { ethiopiaRoutes } from "./ethiopiaRoutes";
import { sudanRoutes } from "./sudanRoutes";
import { eritreaRoutes } from "./eritreaRoutes";
import { upbRoutes } from "./upbRoutes";
import { scheduleRoutes } from "./scheduleRoutes";
import { customerPortalRoutes } from "./customerPortalRoutes";
import { RouteConfig } from "./types";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import PaymentReceiptPage from "@/pages/receipt/PaymentReceiptPage";
import Index from "@/pages/Index";
import Landing from "@/pages/Landing";
import InvoicePrint from "@/pages/invoicing/InvoicePrint";
import { DataBackupManager } from "@/components/data-backup/DataBackupManager";

const baseRoutes: RouteConfig[] = [
  {
    path: "/",
    element: Index,
    private: false
  },
  {
    path: "/landing",
    element: Landing,
    private: false
  },
  {
    path: "/dashboard",
    element: Dashboard,
    private: true
  },
  {
    path: "/invoicing/print/:id",
    element: InvoicePrint,
    private: true
  },
  {
    path: "/data-backup",
    element: DataBackupManager,
    private: true,
    requiredPermission: "controlPanel"
  },
  {
    path: "/receipt",
    element: PaymentReceiptPage,
    private: false
  },
  {
    path: "*",
    element: NotFound,
    private: false
  }
];

export const routes: RouteConfig[] = [
  ...baseRoutes,
  ...adminRoutes,
  ...authRoutes,
  ...dataEntryRoutes,
  ...accountsRoutes,
  ...reconciliationRoutes,
  ...kenyaRoutes,
  ...qatarRoutes,
  ...ugandaRoutes,
  ...sriLankaRoutes,
  ...philippinesRoutes,
  ...somaliaRoutes,
  ...tunisiaRoutes,
  ...algeriaRoutes,
  ...syriaRoutes,
  ...saudiArabiaRoutes,
  ...ethiopiaRoutes,
  ...sudanRoutes,
  ...eritreaRoutes,
  ...upbRoutes,
  ...reportsRoutes,
  ...printDocumentsRoutes,
  ...paymentReceivableRoutes,
  ...masterRoutes,
  ...sellingRatesRoutes,
  ...invoiceRoutes,
  ...scheduleRoutes,
  ...customerPortalRoutes
];
