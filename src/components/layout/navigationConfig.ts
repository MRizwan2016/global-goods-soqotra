
import { Database, DollarSign, Settings, Truck } from "lucide-react";
import { NavigationSections } from "./types";

export const navigationSections: NavigationSections = {
  upb: {
    title: "UPB",
    icon: Database,
    color: "from-green-200 to-green-100 text-green-800 border-green-300 hover:bg-green-50",
    iconColor: "text-green-700",
    submenu: [
      {
        title: "Data Entry",
        items: [
          { name: "Invoicing", path: "/data-entry/invoicing" },
          { name: "Payment Receivable", path: "/data-entry/payment-receivable" },
          { name: "Booking Form Stock", path: "/data-entry/booking-form-stock" },
          { name: "Selling Rates", path: "/data-entry/selling-rates" },
          { name: "Bill of Lading", path: "/data-entry/bill-of-lading" },
          { name: "Print Documents", path: "/data-entry/print-documents" },
        ],
      },
      {
        title: "Reports",
        items: [
          { name: "Financial Reports", path: "/reports/financial" },
          { name: "Cargo Reports", path: "/reports/cargo" },
        ],
      },
      {
        title: "Master Data",
        items: [
          { name: "Invoice Book", path: "/master/book/stock" },
          { name: "Sales Rep", path: "/master/salesrep/list" },
          { name: "Town", path: "/master/town" },
          { name: "Package Options", path: "/master/package/list" },
        ],
      },
    ],
  },
  accounts: {
    title: "Accounts",
    icon: DollarSign,
    color: "from-purple-200 to-purple-100 text-purple-800 border-purple-300 hover:bg-purple-50",
    iconColor: "text-purple-700",
    submenu: [
      {
        title: "Functions",
        items: [
          { name: "Payments", path: "/accounts/payment" },
          { name: "Reconciliation", path: "/accounts/reconciliation" },
        ],
      },
    ],
  },
  admin: {
    title: "Admin",
    icon: Settings,
    color: "from-rose-200 to-rose-100 text-rose-800 border-rose-300 hover:bg-rose-50",
    iconColor: "text-rose-700",
    submenu: [
      {
        title: "Control Panel",
        items: [
          { name: "Control Panel", path: "/admin/control-panel" },
          { name: "Register User", path: "/admin/register" },
        ],
      },
    ],
  },
  cargo: {
    title: "Cargo Collection & Delivery",
    icon: Truck,
    color: "from-sky-200 to-sky-100 text-sky-800 border-sky-300 hover:bg-sky-50",
    iconColor: "text-sky-700",
    submenu: [
      {
        title: "Kenya",
        items: [
          { name: "Dashboard", path: "/kenya/dashboard" },
          { name: "New Delivery", path: "/kenya/new-delivery" },
          { name: "Delivery Tracking", path: "/kenya/delivery-tracking" },
        ],
      },
    ],
  },
};
