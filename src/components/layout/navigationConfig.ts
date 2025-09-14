
import { Database, DollarSign, Settings, Truck } from "lucide-react";
import { NavigationSections } from "./types";

export const navigationSections: NavigationSections = {
  upb: {
    title: "UPB",
    icon: Database,
    color: "text-white",
    bgGradient: "from-green-300 to-emerald-400",
    borderColor: "border-green-100",
    iconColor: "text-white",
    submenu: [
      {
        title: "DATA ENTRY",
        items: [
          { name: "INVOICING", path: "/data-entry/invoicing" },
          { name: "PAYMENT RECEIVABLE", path: "/data-entry/payment-receivable" },
          { name: "BOOKING FORM STOCK", path: "/data-entry/booking-form-stock" },
          { name: "SELLING RATES", path: "/selling-rates" },
          { name: "BILL OF LADING", path: "/data-entry/bill-of-lading" },
          { name: "PRINT DOCUMENTS", path: "/data-entry/print-documents" },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { name: "FINANCIAL REPORTS", path: "/reports/financial" },
          { name: "CARGO REPORTS", path: "/reports/cargo" },
          { name: "SALES REP REPORT", path: "/reports/sales-rep" },
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
    color: "text-white",
    bgGradient: "from-purple-300 to-violet-400",
    borderColor: "border-purple-100",
    iconColor: "text-white",
    submenu: [
      {
        title: "FUNCTIONS",
        items: [
          { name: "PAYMENTS", path: "/accounts/payments" },
          { name: "ADD PAYMENT", path: "/accounts/payment/add" }, 
          { name: "RECONCILIATION", path: "/accounts/reconciliation" },
          { name: "PROFIT & LOSS", path: "/accounts/profit-loss" },
        ],
      },
      {
        title: "REGISTRATIONS",
        items: [
          { name: "VENDORS", path: "/accounts/reconciliation/vendors" },
          { name: "SHIPPING LINES", path: "/accounts/reconciliation/shipping-lines" },
          { name: "FREIGHT FORWARDERS", path: "/accounts/reconciliation/freight-forwarders" },
          { name: "EXPORT CUSTOMERS", path: "/accounts/reconciliation/customers/exports" },
          { name: "IMPORT CUSTOMERS", path: "/accounts/reconciliation/customers/imports" },
        ],
      },
      {
        title: "FINANCIAL ENTITIES",
        items: [
          { name: "BANK DETAILS", path: "/accounts/reconciliation/bank-details" },
          { name: "FINANCIAL INSTITUTIONS", path: "/accounts/reconciliation/financial-institutions" },
          { name: "INSURANCE INSTITUTIONS", path: "/accounts/reconciliation/insurance-institutions" },
        ],
      },
      {
        title: "COUNTRY RECONCILIATIONS",
        items: [
          { name: "SRI LANKA", path: "/accounts/reconciliation/country/lk" },
          { name: "KENYA", path: "/accounts/reconciliation/country/ke" },
          { name: "ERITREA", path: "/accounts/reconciliation/country/er" },
          { name: "SUDAN", path: "/accounts/reconciliation/country/sd" },
          { name: "TUNISIA", path: "/accounts/reconciliation/country/tn" },
          { name: "PHILIPPINES", path: "/accounts/reconciliation/country/ph" },
          { name: "MOZAMBIQUE", path: "/accounts/reconciliation/country/mz" },
          { name: "SAUDI ARABIA", path: "/accounts/reconciliation/country/sa" },
          { name: "UAE", path: "/accounts/reconciliation/country/ae" },
          { name: "OMAN", path: "/accounts/reconciliation/country/om" },
          { name: "BURUNDI", path: "/accounts/reconciliation/country/bi" },
          { name: "ALGERIA", path: "/accounts/reconciliation/country/dz" },
          { name: "GHANA", path: "/accounts/reconciliation/country/gh" },
        ],
      },
    ],
  },
  admin: {
    title: "ADMIN",
    icon: Settings,
    color: "text-white",
    bgGradient: "from-rose-300 to-pink-400",
    borderColor: "border-rose-100",
    iconColor: "text-white",
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
    color: "text-white",
    bgGradient: "from-sky-300 to-blue-400",
    borderColor: "border-sky-100",
    iconColor: "text-white",
    submenu: [
      {
        title: "KENYA",
        items: [
          { name: "DASHBOARD", path: "/kenya" },
          { name: "NEW DELIVERY", path: "/kenya/delivery/new" },
          { name: "DELIVERY TRACKING", path: "/kenya/deliveries" },
          { name: "VIEW SCHEDULES", path: "/kenya/schedules" },
        ],
      },
      {
        title: "QATAR",
        items: [
          { name: "DASHBOARD", path: "/qatar" },
          { name: "ADD NEW JOB", path: "/qatar/job/new" },
          { name: "JOB TRACKING", path: "/qatar/jobs" },
          { name: "JOB SCHEDULE", path: "/qatar/jobs/generate" },
          { name: "VIEW SCHEDULES", path: "/schedules" },
          { name: "PRINT SCHEDULES", path: "/qatar/jobs/print" },
          { name: "VEHICLES", path: "/qatar/vehicles" },
          { name: "DRIVERS", path: "/qatar/drivers" },
          { name: "FIND CUSTOMER", path: "/qatar/find-customer" },
          { name: "CONTAINERS", path: "/qatar/containers" },
        ],
      },
      {
        title: "PHILIPPINES",
        items: [
          { name: "DASHBOARD", path: "/philippines" },
          { name: "VIEW SCHEDULES", path: "/philippines/schedules" },
        ],
      },
      {
        title: "SRI LANKA",
        items: [
          { name: "DASHBOARD", path: "/sri-lanka" },
          { name: "VIEW SCHEDULES", path: "/sri-lanka/schedules" },
        ],
      },
      {
        title: "SOMALIA",
        items: [
          { name: "DASHBOARD", path: "/somalia" },
        ],
      },
      {
        title: "TUNISIA",
        items: [
          { name: "DASHBOARD", path: "/tunisia" },
        ],
      },
      {
        title: "BURUNDI",
        items: [
          { name: "DASHBOARD", path: "/burundi" },
        ],
      },
      {
        title: "ALGERIA",
        items: [
          { name: "DASHBOARD", path: "/algeria" },
        ],
      },
      {
        title: "GHANA",
        items: [
          { name: "DASHBOARD", path: "/ghana" },
        ],
      },
      {
        title: "REPORTS",
        items: [
          { name: "01 PRINT JOB SCHEDULE", path: "/qatar/jobs/print" },
          { name: "02 COMPLETED JOBS", path: "/qatar/completed-jobs" },
          { name: "03 CANCELED JOBS", path: "/qatar/cancelled-jobs" },
          { name: "04 STOCK MOVEMENT", path: "/reports/cargo" },
          { name: "05 STOCK BALANCE", path: "/reports/cargo/statistics" },
          { name: "06 JOB STATUS", path: "/qatar/job-status" },
        ],
      },
    ],
  },
};
