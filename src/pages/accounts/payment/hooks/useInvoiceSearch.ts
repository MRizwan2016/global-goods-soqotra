
import { useState } from "react";
import { Invoice } from "../types";

export const useInvoiceSearch = () => {
  const [invoicePrefix, setInvoicePrefix] = useState<string>("");
  const [matchingInvoices, setMatchingInvoices] = useState<Invoice[]>([]);
  const [showInvoiceSelector, setShowInvoiceSelector] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Handle invoice search
  const handleInvoiceSearch = () => {
    // Mock implementation for demonstration
    if (invoicePrefix.trim() === "") {
      setMatchingInvoices([]);
      setShowInvoiceSelector(false);
      return;
    }

    // Mock data for demonstration
    const mockInvoices: Invoice[] = [
      {
        id: "1",
        invoiceNumber: `INV-${invoicePrefix}001`,
        bookingForm: "BF-001",
        shipper: "ABC Company",
        consignee: "XYZ Corp",
        warehouse: "Warehouse A",
        shipmentType: "AIR",
        grossAmount: 1000,
        discount: 100,
        netAmount: 900,
        totalPaid: 500,
        balanceToPay: 400
      },
      {
        id: "2",
        invoiceNumber: `INV-${invoicePrefix}002`,
        bookingForm: "BF-002",
        shipper: "DEF Ltd",
        consignee: "UVW Inc",
        warehouse: "Warehouse B",
        shipmentType: "SEA",
        grossAmount: 2000,
        discount: 200,
        netAmount: 1800,
        totalPaid: 1000,
        balanceToPay: 800
      }
    ];

    setMatchingInvoices(mockInvoices);
    setShowInvoiceSelector(true);
  };

  return {
    invoicePrefix,
    setInvoicePrefix,
    matchingInvoices,
    showInvoiceSelector,
    setShowInvoiceSelector,
    selectedInvoice,
    setSelectedInvoice,
    handleInvoiceSearch
  };
};
