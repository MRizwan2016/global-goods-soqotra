
import { useState, useEffect } from "react";
import { Invoice } from "../types";
import { toast } from "sonner";

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
        console.log("Found stored invoice in sessionStorage:", storedInvoice);
        const parsedInvoice = JSON.parse(storedInvoice);
        setSelectedInvoice(parsedInvoice);
        
        // Clear from session storage to prevent reuse
        sessionStorage.removeItem('selectedInvoice');
        
        toast.success("Invoice loaded", {
          description: `Invoice ${parsedInvoice.invoiceNumber} has been loaded for payment`,
        });
      } catch (error) {
        console.error("Error parsing stored invoice:", error);
        toast.error("Error loading invoice", {
          description: "There was a problem loading the selected invoice",
        });
      }
    } else {
      console.log("No stored invoice found in sessionStorage");
    }
  }, []);

  // Handle invoice search automatically when prefix changes
  useEffect(() => {
    handleInvoiceSearch();
  }, [invoicePrefix]);

  // Handle invoice search
  const handleInvoiceSearch = () => {
    // Don't show dropdown for empty input
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
        date: new Date().toISOString().split('T')[0],
        net: 900,
        paid: false,
        bookingForm: "BF-001",
        shipper: "ABC Company",
        consignee: "XYZ Corp",
        warehouse: "Warehouse A",
        shipmentType: "AIR",
        grossAmount: 1000,
        discount: 100,
        netAmount: 900,
        totalPaid: 500,
        balanceToPay: 400,
        currency: "QAR"
      },
      {
        id: "2",
        invoiceNumber: `INV-${invoicePrefix}002`,
        date: new Date().toISOString().split('T')[0],
        net: 1800,
        paid: false,
        bookingForm: "BF-002",
        shipper: "DEF Ltd",
        consignee: "UVW Inc",
        warehouse: "Warehouse B",
        shipmentType: "SEA",
        grossAmount: 2000,
        discount: 200,
        netAmount: 1800,
        totalPaid: 1000,
        balanceToPay: 800,
        currency: "USD"
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
