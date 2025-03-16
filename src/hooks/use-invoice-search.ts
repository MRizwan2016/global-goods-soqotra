
import { useState } from "react";
import { mockInvoiceData } from "@/data/mockData";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customer: string;
  shipper1: string;
  consignee1: string;
  salesAgent: string;
  warehouse: string;
  doorToDoor: boolean;
  nic: string;
  volume: string;
  weight: string;
  packages: string; // Changed from number to string to match usage
  gross: string; // Changed from number to string to match usage
  discount: string;
  net: string;
  paid: boolean;
  statusCharge: string;
  offerDiscount: string;
  country: string;
}

export const useInvoiceSearch = () => {
  const [searchPrefix, setSearchPrefix] = useState("");
  const [searchResults, setSearchResults] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(false);

  const searchInvoiceByPrefix = (prefix: string) => {
    if (prefix.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    
    // In a real app, this would be an API call
    // For now, we'll use the mockInvoiceData
    setTimeout(() => {
      // Cast the mockInvoiceData to ensure it matches our Invoice interface
      const results = mockInvoiceData.filter(invoice => 
        invoice.invoiceNumber.toLowerCase().startsWith(prefix.toLowerCase())
      ) as unknown as Invoice[];
      
      setSearchResults(results);
      setLoading(false);
    }, 500); // Simulate network delay
  };

  const selectInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setSearchResults([]);
    setSearchPrefix("");
  };

  const clearSelection = () => {
    setSelectedInvoice(null);
    setSearchResults([]);
    setSearchPrefix("");
  };

  return {
    searchPrefix,
    setSearchPrefix,
    searchResults,
    selectedInvoice,
    loading,
    searchInvoiceByPrefix,
    selectInvoice,
    clearSelection
  };
};
