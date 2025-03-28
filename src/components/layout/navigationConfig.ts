
import { Database, DollarSign, Settings, Truck } from "lucide-react";
import { NavigationSections } from "./types";

export const navigationSections: NavigationSections = {
  upb: {
    title: "UPB",
    icon: Database,
    color: "bg-green-100 text-green-800 border border-green-300",
    gradient: "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border border-green-200",
    iconColor: "text-green-700",
    submenu: [
      {
        title: "DATA ENTRY",
        items: [
          { name: "INVOICING", path: "/data-entry/invoicing" },
          { name: "PAYMENT RECEIVABLE", path: "/data-entry/payment-receivable" },
          { name: "BOOKING FORM STOCK", path: "/data-entry/booking-form-stock" },
          { name: "SELLING RATES", path: "/data-entry/selling-rates" },
          { name: "BILL OF LADING", path: "/data-entry/bill-of-lading" },
          { name: "PRINT DOCUMENTS", path: "/data-entry/print-documents" },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { name: "FINANCIAL REPORTS", path: "/reports/financial" },
          { name: "CARGO REPORTS", path: "/reports/cargo" },
        ],
      },
      {
        title: "MASTER DATA",
        items: [
          { name: "INVOICE BOOK", path: "/master/book/stock" },
          { name: "SALES REP", path: "/master/salesrep/list" },
          { name: "TOWN", path: "/master/town" },
          { name: "PACKAGE OPTIONS", path: "/master/package/list" },
          { name: "CONTAINER MANAGEMENT", path: "/qatar/containers" },
          { name: "VESSEL MANAGEMENT", path: "/qatar/vessels" },
        ],
      },
    ],
  },
  accounts: {
    title: "ACCOUNTS",
    icon: DollarSign,
    color: "bg-purple-100 text-purple-800 border border-purple-300",
    gradient: "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border border-purple-200",
    iconColor: "text-purple-700",
    submenu: [
      {
        title: "FUNCTIONS",
        items: [
          { name: "PAYMENTS", path: "/accounts/payment" },
          { name: "RECONCILIATION", path: "/accounts/reconciliation" },
        ],
      },
    ],
  },
  admin: {
    title: "ADMIN",
    icon: Settings,
    color: "bg-rose-100 text-rose-800 border border-rose-300",
    gradient: "bg-gradient-to-r from-rose-100 to-rose-50 text-rose-800 border border-rose-200",
    iconColor: "text-rose-700",
    submenu: [
      {
        title: "CONTROL PANEL",
        items: [
          { name: "CONTROL PANEL", path: "/admin/control-panel" },
          { name: "REGISTER USER", path: "/admin/register" },
        ],
      },
    ],
  },
  cargo: {
    title: "CARGO COLLECTION & DELIVERY",
    icon: Truck,
    color: "bg-sky-100 text-sky-800 border border-sky-300",
    gradient: "bg-gradient-to-r from-sky-100 to-sky-50 text-sky-800 border border-sky-200",
    iconColor: "text-sky-700",
    submenu: [
      {
        title: "KENYA",
        items: [
          { name: "DASHBOARD", path: "/kenya" },
          { name: "NEW DELIVERY", path: "/kenya/delivery/new" },
          { name: "DELIVERY TRACKING", path: "/kenya/deliveries" },
        ],
      },
      {
        title: "QATAR",
        items: [
          { name: "DASHBOARD", path: "/qatar" },
          { name: "ADD NEW JOB", path: "/qatar/job/new" },
          { name: "JOB TRACKING", path: "/qatar/jobs" },
          { name: "JOB SCHEDULE", path: "/qatar/jobs/generate" },
          { name: "PRINT SCHEDULES", path: "/qatar/jobs/print" },
          { name: "VEHICLES", path: "/qatar/vehicles" },
          { name: "DRIVERS", path: "/qatar/drivers" },
          { name: "FIND CUSTOMER", path: "/qatar/find-customer" },
          { name: "CONTAINERS", path: "/qatar/containers" },
        ],
      },
    ],
  },
};
