
import { useState, useEffect } from "react";
import { Invoice } from "../types";
import { toast } from "sonner";
import { ExternalInvoiceService } from "@/services/ExternalInvoiceService";

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
        
        // Set the invoice prefix to help with debugging
        setInvoicePrefix(String(parsedInvoice.invoiceNumber || ""));
        
        // Set the selected invoice
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
    if (invoicePrefix) {
      handleInvoiceSearch();
    }
  }, [invoicePrefix]);

  // Handle invoice search
  const handleInvoiceSearch = async () => {
    // Don't show dropdown for empty input
    if (invoicePrefix.trim() === "") {
      setMatchingInvoices([]);
      setShowInvoiceSelector(false);
      return;
    }

    // Auto-sync external invoices if needed
    await ExternalInvoiceService.autoSync();

    // Get all invoices including external ones
    let allInvoices: Invoice[] = ExternalInvoiceService.getAllInvoices();
    
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
          invoiceNumber: "13136051",
          date: "2025-04-01",
          net: 250,
          paid: false,
          bookingForm: "BF-13136051",
          shipper: "MR. SOORIYAPPERUMA",
          shipper1: "MR. SOORIYAPPERUMA",
          consignee: "MRS. FERNANDO",
          consignee1: "MRS. FERNANDO",
          warehouse: "Doha Warehouse",
          shipmentType: "Air Freight",
          freightType: "Air Freight",
          grossAmount: 250,
          gross: 250,
          discount: 0,
          netAmount: 250,
          totalPaid: 0,
          balanceToPay: 250,
          currency: "QAR",
          country: "Qatar"
        }
      ];
    }

    // Filter to match the invoicePrefix
    const filteredInvoices = allInvoices.filter(inv => 
      inv.invoiceNumber?.toLowerCase().includes(invoicePrefix.toLowerCase())
    );

    // All invoices are already combined, just filter them
    const allMatchedInvoices = filteredInvoices;
    
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
