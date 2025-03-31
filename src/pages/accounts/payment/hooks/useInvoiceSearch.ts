
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

    // Mock data for demonstration with the specific 010000 invoice
    const mockInvoices: Invoice[] = [
      {
        id: "1",
        invoiceNumber: "010000",
        date: new Date().toISOString().split('T')[0],
        net: 1500,
        paid: false,
        bookingForm: "BF-XA-2024-010",
        shipper: "Global Shipping Inc.",
        consignee: "Qatar Logistics Co.",
        warehouse: "Doha Main Warehouse",
        shipmentType: "SEA",
        grossAmount: 1700,
        discount: 200,
        netAmount: 1500,
        totalPaid: 0,
        balanceToPay: 1500,
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

    // Filter to match the invoicePrefix or show the 010000 invoice
    const filteredInvoices = mockInvoices.filter(inv => 
      inv.invoiceNumber.toLowerCase().includes(invoicePrefix.toLowerCase()) ||
      (invoicePrefix === "01" && inv.invoiceNumber === "010000")
    );

    // Also get stored invoices from local storage
    const storedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const filteredStoredInvoices = storedInvoices.filter((inv: any) => 
      inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(invoicePrefix.toLowerCase())
    );

    // Combine mock and stored invoices
    const allInvoices = [...filteredInvoices, ...filteredStoredInvoices];
    
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
