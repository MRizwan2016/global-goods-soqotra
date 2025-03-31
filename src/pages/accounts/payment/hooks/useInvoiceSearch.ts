
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

    // First get all invoices from localStorage
    let allInvoices: Invoice[] = [];
    
    // Get stored invoices from localStorage
    const storedInvoicesStr = localStorage.getItem('invoices');
    if (storedInvoicesStr) {
      try {
        const storedInvoices = JSON.parse(storedInvoicesStr);
        allInvoices = storedInvoices;
      } catch (error) {
        console.error("Error parsing stored invoices:", error);
      }
    }
    
    // If we don't have any invoices yet, add our mock data
    if (allInvoices.length === 0) {
      // Add mock data for demonstration with the specific 010000 invoice
      allInvoices = [
        {
          id: "1",
          invoiceNumber: "010000",
          date: "2023-03-30",
          net: 1500,
          paid: false,
          bookingForm: "BF-10000",
          shipper: "Global Exports Ltd.",
          shipper1: "Global Exports Ltd.",
          consignee: "PASTOR ZACH RICH",
          consignee1: "PASTOR ZACH RICH",
          warehouse: "Main Warehouse",
          shipmentType: "Air Freight",
          freightType: "Air Freight",
          grossAmount: 1500,
          gross: 1500,
          discount: 0,
          netAmount: 1500,
          totalPaid: 0,
          balanceToPay: 1500,
          currency: "QAR",
          country: "Qatar"
        },
        {
          id: "2",
          invoiceNumber: `INV-${invoicePrefix}002`,
          date: new Date().toISOString().split('T')[0],
          net: 1800,
          paid: false,
          bookingForm: "BF-002",
          shipper: "DEF Ltd",
          shipper1: "DEF Ltd",
          consignee: "UVW Inc",
          consignee1: "UVW Inc",
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
    }

    // Filter to match the invoicePrefix
    const filteredInvoices = allInvoices.filter(inv => 
      inv.invoiceNumber?.toLowerCase().includes(invoicePrefix.toLowerCase())
    );

    // Also get stored invoices from generatedInvoices in local storage (if any)
    const generatedInvoicesStr = localStorage.getItem('generatedInvoices');
    let filteredGeneratedInvoices: Invoice[] = [];
    
    if (generatedInvoicesStr) {
      try {
        const generatedInvoices = JSON.parse(generatedInvoicesStr);
        filteredGeneratedInvoices = generatedInvoices.filter((inv: any) => 
          inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(invoicePrefix.toLowerCase())
        );
      } catch (error) {
        console.error("Error parsing generated invoices:", error);
      }
    }

    // Combine all matched invoices
    const allMatchedInvoices = [...filteredInvoices, ...filteredGeneratedInvoices];
    
    // Set the matching invoices and show selector if there are matches
    setMatchingInvoices(allMatchedInvoices);
    setShowInvoiceSelector(allMatchedInvoices.length > 0);
    
    console.log("Invoice search results:", allMatchedInvoices);
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
