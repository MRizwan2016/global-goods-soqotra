/*
 * MainNavigation – renders sidebar sections.
 * Hardcoded section order ensures SRI LANKA and SAUDI ARABIA always appear.
 * Updated 2026-03-26 – cache-bust v3
 */
import React, { useEffect } from 'react';
import { Database, DollarSign, Settings, Truck, Globe } from 'lucide-react';
import { useMainNavigation } from './useMainNavigation';
import MenuSection from './MenuSection';
import { NavigationSection, NavigationSections } from './types';
import { useAuth } from '@/hooks/use-auth';

/* ---- inline section definitions so there is zero import indirection ---- */
const SECTIONS: NavigationSections = {
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
          { name: "STAFF PERFORMANCE", path: "/reports/staff-performance" },
        ],
      },
      {
        title: "MASTER DATA",
        items: [
          { name: "MANAGE INVOICE BOOK STOCK", path: "/master/book/stock" },
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
          { name: "ALGERIA PAYMENTS", path: "/algeria/accounts" },
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
          { name: "REGISTER USER", path: "/register" },
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
        title: "TRACK & TRACE",
        items: [
          { name: "CUSTOMER PORTAL", path: "/customer-portal" },
          { name: "ADMIN - CARGO TRACKING", path: "/admin/control-panel" },
          { name: "CUSTOMER MANAGEMENT", path: "/customer-portal/admin" },
        ],
      },
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
          { name: "DASHBOARD", path: "/sri-lanka/collection-delivery" },
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
          { name: "VEHICLE REGISTRY", path: "/algeria/vehicles" },
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
  sriLanka: {
    title: "SRI LANKA",
    icon: Globe,
    color: "text-white",
    bgGradient: "from-amber-600 to-amber-800",
    borderColor: "border-amber-200",
    iconColor: "text-white",
    submenu: [
      {
        title: "INVOICING",
        items: [
          { name: "DASHBOARD", path: "/sri-lanka" },
          { name: "ADD NEW INVOICE", path: "/sri-lanka/invoice/add" },
        ],
      },
      {
        title: "COLLECTION & DELIVERY",
        items: [
          { name: "COLLECTION & DELIVERY", path: "/sri-lanka/collection-delivery" },
          { name: "ADD NEW JOB", path: "/sri-lanka/new-job" },
          { name: "VIEW SCHEDULES", path: "/sri-lanka/schedules" },
        ],
      },
      {
        title: "ACCOUNTS",
        items: [
          { name: "PAYMENT RECEIPT", path: "/sri-lanka/payment-receipt" },
          { name: "RECONCILIATION", path: "/sri-lanka/reconciliation" },
        ],
      },
    ],
  },
  saudiArabia: {
    title: "SAUDI ARABIA",
    icon: Globe,
    color: "text-white",
    bgGradient: "from-green-500 to-emerald-600",
    borderColor: "border-green-200",
    iconColor: "text-white",
    submenu: [
      {
        title: "INVOICING",
        items: [
          { name: "DASHBOARD", path: "/saudi-arabia" },
          { name: "ADD NEW INVOICE", path: "/saudi-arabia/invoice/add" },
          { name: "SAVED INVOICES", path: "/saudi-arabia/saved-invoices" },
        ],
      },
      {
        title: "COLLECTION & DELIVERY",
        items: [
          { name: "COLLECTION & DELIVERY", path: "/saudi-arabia/collection-delivery" },
          { name: "VIEW SCHEDULES", path: "/saudi-arabia/schedules" },
        ],
      },
      {
        title: "ACCOUNTS",
        items: [
          { name: "PAYMENT RECEIPT", path: "/saudi-arabia/payment-receipt" },
          { name: "RECONCILIATION", path: "/saudi-arabia/reconciliation" },
        ],
      },
    ],
  },
};

const SECTION_ORDER = ['upb', 'accounts', 'admin', 'cargo', 'sriLanka', 'saudiArabia'] as const;

const PERMISSION_MAP: Record<string, string> = {
  upb: 'masterData',
  accounts: 'accounting',
  admin: 'controlPanel',
};

export const MainNavigation: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();
  const { expandedSections, toggleSection, isPathActive, location } = useMainNavigation(SECTIONS, [...SECTION_ORDER]);

  // Auto-expand the section that contains the current path
  useEffect(() => {
    if (location.pathname) {
      SECTION_ORDER.forEach(key => {
        const section = SECTIONS[key];
        if (!section) return;
        const hasActivePath = section.submenu.some(sub =>
          sub.items.some(item => isPathActive(item.path))
        );
        if (hasActivePath) {
          toggleSection(key);
        }
        if (location.pathname === '/accounts/profit-loss' && key === 'accounts') {
          toggleSection(key);
        }
      });
    }
  }, [location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const onNavigate = (path: string) => {
    console.log(`Navigating to ${path}`);
  };

  // Filter navigation sections based on user permissions
  const visibleKeys = SECTION_ORDER.filter(sectionKey => {
    if (!currentUser || isAdmin) return true;
    const perm = PERMISSION_MAP[sectionKey];
    if (!perm) return true; // cargo, sriLanka, saudiArabia → always visible
    return (currentUser.permissions as any)[perm] || false;
  });

  return (
    <nav className="w-full space-y-1">
      {visibleKeys.map((sectionKey) => {
        const section = SECTIONS[sectionKey];
        return (
          <MenuSection
            key={sectionKey}
            sectionKey={sectionKey}
            section={section}
            expanded={!!expandedSections[sectionKey]}
            toggleSection={toggleSection}
            isPathActive={isPathActive}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
};

export default MainNavigation;
