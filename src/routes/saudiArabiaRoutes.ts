import { RouteConfig } from "./types";
import SaudiArabiaInvoiceDashboard from "@/pages/saudi-arabia/SaudiArabiaInvoiceDashboard";
import SaudiArabiaInvoiceForm from "@/pages/saudi-arabia/SaudiArabiaInvoiceForm";
import SaudiArabiaInvoicePrint from "@/pages/saudi-arabia/SaudiArabiaInvoicePrint";
import SaudiArabiaAirManifest from "@/pages/saudi-arabia/SaudiArabiaAirManifest";
import SaudiArabiaSeaManifest from "@/pages/saudi-arabia/SaudiArabiaSeaManifest";
import ViewSchedules from "@/pages/schedules/ViewSchedules";

export const saudiArabiaRoutes: RouteConfig[] = [
  {
    path: "/saudi-arabia",
    element: SaudiArabiaInvoiceDashboard,
    private: true
  },
  {
    path: "/saudi-arabia/schedules",
    element: ViewSchedules,
    private: true
  },
  {
    path: "/saudi-arabia/invoice/add",
    element: SaudiArabiaInvoiceForm,
    private: true
  },
  {
    path: "/saudi-arabia/invoice/edit/:id",
    element: SaudiArabiaInvoiceForm,
    private: true
  },
  {
    path: "/saudi-arabia/invoice/print/:id",
    element: SaudiArabiaInvoicePrint,
    private: true
  },
  {
    path: "/saudi-arabia/manifest/air/:manifestId",
    element: SaudiArabiaAirManifest,
    private: true
  },
  {
    path: "/saudi-arabia/manifest/sea/:manifestId",
    element: SaudiArabiaSeaManifest,
    private: true
  }
];
