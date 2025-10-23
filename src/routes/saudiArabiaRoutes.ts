import { RouteConfig } from "./types";
import SaudiArabiaDashboard from "@/pages/saudi-arabia/SaudiArabiaDashboard";
import SaudiArabiaInvoiceForm from "@/pages/saudi-arabia/SaudiArabiaInvoiceForm";
import SaudiArabiaInvoicePrint from "@/pages/saudi-arabia/SaudiArabiaInvoicePrint";

export const saudiArabiaRoutes: RouteConfig[] = [
  {
    path: "/saudi-arabia",
    element: SaudiArabiaDashboard,
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
  }
];