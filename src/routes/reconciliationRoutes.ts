
import { RouteConfig } from "./types";
import ReconciliationPage from "@/pages/accounts/payments/ReconciliationPage";
import VendorRegistrationPage from "@/pages/accounts/reconciliation/VendorRegistrationPage";
import ShippingLineRegistrationPage from "@/pages/accounts/reconciliation/ShippingLineRegistrationPage";
import FreightForwarderRegistrationPage from "@/pages/accounts/reconciliation/FreightForwarderRegistrationPage";
import CustomerRegistrationPage from "@/pages/accounts/reconciliation/CustomerRegistrationPage";
import BankDetailsPage from "@/pages/accounts/reconciliation/BankDetailsPage";
import FinancialInstitutionsPage from "@/pages/accounts/reconciliation/FinancialInstitutionsPage";
import InsuranceInstitutionsPage from "@/pages/accounts/reconciliation/InsuranceInstitutionsPage";
import CountryReconciliationPage from "@/pages/accounts/reconciliation/CountryReconciliationPage";

const reconciliationRoutes: RouteConfig[] = [
  // Main reconciliation page
  {
    path: "accounts/reconciliation",
    element: ReconciliationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  
  // Registration routes
  {
    path: "accounts/reconciliation/vendors",
    element: VendorRegistrationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/reconciliation/shipping-lines",
    element: ShippingLineRegistrationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/reconciliation/freight-forwarders",
    element: FreightForwarderRegistrationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/reconciliation/customers/exports",
    element: CustomerRegistrationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/reconciliation/customers/imports",
    element: CustomerRegistrationPage,
    private: true,
    requiredFile: "reconciliation"
  },
  
  // Financial entities routes
  {
    path: "accounts/reconciliation/bank-details",
    element: BankDetailsPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/reconciliation/financial-institutions",
    element: FinancialInstitutionsPage,
    private: true,
    requiredFile: "reconciliation"
  },
  {
    path: "accounts/reconciliation/insurance-institutions",
    element: InsuranceInstitutionsPage,
    private: true,
    requiredFile: "reconciliation"
  },
  
  // Country-specific reconciliation routes
  {
    path: "accounts/reconciliation/country/:countryCode",
    element: CountryReconciliationPage,
    private: true,
    requiredFile: "reconciliation"
  }
];

export default reconciliationRoutes;
