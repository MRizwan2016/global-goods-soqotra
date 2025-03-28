
import { useState, useEffect } from "react";
import { Invoice } from "../types";

export const useInvoiceSearch = () => {
  const [invoicePrefix, setInvoicePrefix] = useState<string>("");
  const [matchingInvoices, setMatchingInvoices] = useState<Invoice[]>([]);
  const [showInvoiceSelector, setShowInvoiceSelector] = useState<boolean>(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Check if there's a stored invoice from another component
  useEffect(() => {
    const storedInvoice = sessionStorage.getItem('selectedInvoice');
    if (storedInvoice) {
      try {
        const parsedInvoice = JSON.parse(storedInvoice);
        setSelectedInvoice(parsedInvoice);
        // Clear from session storage to prevent reuse
        sessionStorage.removeItem('selectedInvoice');
      } catch (error) {
        console.error("Error parsing stored invoice:", error);
      }
    }
  }, []);

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

    // Also get stored invoices from local storage
    const storedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const filteredStoredInvoices = storedInvoices.filter((inv: any) => 
      inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(invoicePrefix.toLowerCase())
    );

    // Combine mock and stored invoices
    const allInvoices = [...mockInvoices, ...filteredStoredInvoices];
    
    setMatchingInvoices(allInvoices);
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
