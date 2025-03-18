
export const filePermissions = {
  masterData: {
    label: "Master Data",
    icon: "Database",
    files: {
      salesRep: { label: "Sales Rep", path: "/master/sales-rep" },
      town: { label: "Town", path: "/master/town" },
      item: { label: "Item", path: "/master/item" },
      packageOptions: { label: "Package Options", path: "/master/package-options" },
      sellingRates: { label: "Selling Rates", path: "/master/selling-rates" },
      container: { label: "Container", path: "/master/container" },
      vessel: { label: "Vessel", path: "/master/vessel" },
      invoiceBook: { label: "Invoice Book", path: "/master/invoice-book" },
      driverHelper: { label: "Driver/Helper", path: "/master/driver-helper" },
    }
  },
  dataEntry: {
    label: "Data Entry",
    icon: "FileInput",
    files: {
      invoicing: { label: "Invoicing", path: "/data-entry/invoicing" },
      paymentReceivable: { label: "Payment Receivable", path: "/data-entry/payment" },
      loadContainer: { label: "Load Container", path: "/data-entry/container" },
      loadVessel: { label: "Load Vessel", path: "/data-entry/vessel" },
      loadAirCargo: { label: "Load Air Cargo", path: "/data-entry/air-cargo" },
      packingList: { label: "Packing List", path: "/data-entry/packing-list" },
    }
  },
  reports: {
    label: "Reports",
    icon: "BarChart4",
    files: {
      cargoReports: { label: "Cargo Reports", path: "/reports/cargo" },
      financialReports: { label: "Financial Reports", path: "/reports/financial" },
      shippingReports: { label: "Shipping Reports", path: "/reports/shipping" },
    }
  },
  accounting: {
    label: "Accounts",
    icon: "DollarSign",
    files: {
      paymentMethods: { label: "Payment Methods", path: "/accounts/payment-methods" },
      reconciliation: { label: "Reconciliation", path: "/accounts/reconciliation" },
      profitLoss: { label: "Profit & Loss", path: "/accounts/profit-loss" },
      financialReports: { label: "Financial Reports", path: "/accounts/financial-reports" },
    }
  }
};
