
export const filePermissions = {
  masterData: {
    title: "Master Data Files",
    files: {
      salesRep: { label: "Sales Representative", path: "/master/sales-rep" },
      town: { label: "Town Management", path: "/master/town" },
      item: { label: "Item Management", path: "/master/item" },
      packageOptions: { label: "Package Options", path: "/master/package-options" },
      sellingRates: { label: "Selling Rates", path: "/master/selling-rates" },
      container: { label: "Container Management", path: "/master/container" },
      vessel: { label: "Vessel Management", path: "/master/vessel" },
      invoiceBook: { label: "Manage Invoice Book Stock", path: "/master/invoice-book" },
      driverHelper: { label: "Driver/Helper Management", path: "/master/driver-helper" }
    }
  },
  dataEntry: {
    title: "Data Entry Files",
    files: {
      invoicing: { label: "Invoicing", path: "/data-entry/invoicing" },
      paymentReceivable: { label: "Payment Receivable", path: "/data-entry/payment-receivable" },
      loadContainer: { label: "Load Container", path: "/data-entry/load-container" },
      loadVessel: { label: "Load Vessel", path: "/data-entry/load-vessel" },
      loadAirCargo: { label: "Load Air Cargo", path: "/data-entry/load-air-cargo" },
      packingList: { label: "Packing List", path: "/data-entry/packing-list" }
    }
  },
  reports: {
    title: "Reports Files",
    files: {
      cargoReports: { label: "Cargo Reports", path: "/reports/cargo" },
      financialReports: { label: "Financial Reports", path: "/reports/financial" },
      shippingReports: { label: "Shipping Reports", path: "/reports/shipping" }
    }
  },
  accounting: {
    title: "Accounting Files",
    files: {
      paymentMethods: { label: "Payment Methods", path: "/accounting/payment-methods" },
      reconciliation: { label: "Reconciliation", path: "/accounting/reconciliation" },
      profitLoss: { label: "Profit & Loss", path: "/accounts/profit-loss" }
    }
  },
  accountFunctions: {
    title: "Account Functions",
    files: {
      accountFunctionFiles: { label: "Function Management", path: "/accounts/functions" }
    }
  },
  accountRegistrations: {
    title: "Account Registrations", 
    files: {
      accountRegistrationFiles: { label: "Registration Management", path: "/accounts/registrations" }
    }
  },
  accountFinancialEntities: {
    title: "Account Financial Entities",
    files: {
      accountFinancialFiles: { label: "Financial Entity Management", path: "/accounts/financial-entities" }
    }
  },
  accountCountryReconciliations: {
    title: "Account Country Reconciliations",
    files: {
      accountCountryFiles: { label: "Country Reconciliation Reports", path: "/accounts/country-reconciliations" }
    }
  }
};
