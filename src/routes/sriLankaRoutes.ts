import { RouteConfig } from "./types";
import SriLankaDashboard from "@/pages/sri-lanka/SriLankaDashboard";
import SriLankaInvoiceForm from "@/pages/sri-lanka/SriLankaInvoiceForm";
import SriLankaInvoicePrint from "@/pages/sri-lanka/SriLankaInvoicePrint";
import SriLankaAirManifestPage from "@/pages/sri-lanka/manifest/SriLankaAirManifestPage";
import SriLankaSeaManifestPage from "@/pages/sri-lanka/manifest/SriLankaSeaManifestPage";

export const sriLankaRoutes: RouteConfig[] = [
  {
    path: "/sri-lanka",
    element: SriLankaDashboard,
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
  }
];