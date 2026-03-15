import { RouteConfig } from "./types";
import PhilippinesInvoiceDashboard from "@/pages/philippines/PhilippinesInvoiceDashboard";
import PhilippinesInvoiceForm from "@/pages/philippines/PhilippinesInvoiceForm";
import PhilippinesInvoicePrint from "@/pages/philippines/PhilippinesInvoicePrint";
import PhilippinesAirManifest from "@/pages/philippines/PhilippinesAirManifest";
import PhilippinesSeaManifest from "@/pages/philippines/PhilippinesSeaManifest";
import ViewSchedules from "@/pages/schedules/ViewSchedules";

export const philippinesRoutes: RouteConfig[] = [
  {
    path: "/philippines",
    element: PhilippinesInvoiceDashboard,
    private: true
  },
  {
    path: "/philippines/schedules",
    element: ViewSchedules,
    private: true
  },
  {
    path: "/philippines/invoice/add",
    element: PhilippinesInvoiceForm,
    private: true
  },
  {
    path: "/philippines/invoice/edit/:id",
    element: PhilippinesInvoiceForm,
    private: true
  },
  {
    path: "/philippines/invoice/print/:id",
    element: PhilippinesInvoicePrint,
    private: true
  },
  {
    path: "/philippines/manifest/air/:manifestId",
    element: PhilippinesAirManifest,
    private: true
  },
  {
    path: "/philippines/manifest/sea/:manifestId",
    element: PhilippinesSeaManifest,
    private: true
  }
];
