
import { useState, useEffect } from "react";
import { mockInvoiceData } from "@/data/mockData";

// Define a type for our invoice objects to help TypeScript
interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  customer: string;
  branch?: string;
  sector?: string;
  freightBy?: string;
  doorToDoor?: boolean;
  updatedAt?: string; // Make updatedAt optional since it may not exist in all invoices
  [key: string]: any; // Allow other properties
}

export const useInvoiceList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([]);
  const entriesPerPage = 50;
  const [branch, setBranch] = useState("ALL");
  const [sector, setSector] = useState("ALL");
  const [transport, setTransport] = useState("ALL");
  const [door, setDoor] = useState("ALL");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  // Load invoice data from localStorage and merge with mock data
  useEffect(() => {
    // Get data from localStorage
    const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Create a map of mockInvoiceData by ID for faster lookups
    const mockDataMap = new Map(mockInvoiceData.map(item => [item.id, item]));
    
    // Create a map of stored invoices by ID
    const storedInvoiceMap = new Map(storedInvoices.map((item: any) => [item.id, item]));
    
    // Merge the two sets of data, prioritizing stored invoices
    const mergedData = [...mockInvoiceData];
    
    // Add or update stored invoices
    storedInvoices.forEach((invoice: any) => {
      if (mockDataMap.has(invoice.id)) {
        // Update existing mock invoice with stored data
        const index = mergedData.findIndex(item => item.id === invoice.id);
        if (index !== -1) {
          mergedData[index] = invoice;
        }
      } else {
        // Add new invoices that don't exist in mock data
        mergedData.push(invoice);
      }
    });
    
    // Sort by date instead of updatedAt since not all invoices have updatedAt
    mergedData.sort((a, b) => {
      // Get timestamps safely with type checking
      const getTimestamp = (item: Invoice): number => {
        if (item.updatedAt) {
          return new Date(item.updatedAt).getTime();
        } else if (item.date) {
          return new Date(item.date).getTime();
        }
        return 0;
      };
      
      const dateA = getTimestamp(a);
      const dateB = getTimestamp(b);
      
      return dateB - dateA; // Sort in descending order (newest first)
    });
    
    setInvoiceData(mergedData);
    console.log("Loaded invoice data:", mergedData);
  }, []);

  const handlePrintInvoice = (invoiceId: string) => {
    // Prevent event bubbling if this is being called from an event handler
    if (window.event) {
      window.event.stopPropagation?.();
      window.event.preventDefault?.();
    }
    
    console.log("Opening print window for invoice ID:", invoiceId);
    // Open in a new tab to avoid navigation issues
    window.open(`/data-entry/invoicing/print/${invoiceId}`, '_blank');
  };

  const filteredData = invoiceData.filter(
    (item) =>
      (searchText === "" || 
        item.id?.toLowerCase().includes(searchText.toLowerCase()) || 
        item.invoiceNumber?.toLowerCase().includes(searchText.toLowerCase()) || 
        item.customer?.toLowerCase().includes(searchText.toLowerCase())) &&
      (branch === "ALL" || item.branch === branch) &&
      (sector === "ALL" || item.sector === sector) &&
      (transport === "ALL" || item.freightBy === transport) &&
      (door === "ALL" || 
        (door === "YES" && item.doorToDoor === true) || 
        (door === "NO" && item.doorToDoor === false)) &&
      (invoiceNumber === "" || item.invoiceNumber === invoiceNumber)
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  
  // Get unique invoice numbers for the dropdown
  const invoiceNumbers = [...new Set(invoiceData.map(i => i.invoiceNumber))];

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    branch,
    setBranch,
    sector,
    setSector,
    transport,
    setTransport,
    door,
    setDoor,
    invoiceNumber,
    setInvoiceNumber,
    handlePrintInvoice,
    filteredData,
    totalPages,
    indexOfLastEntry,
    indexOfFirstEntry,
    currentEntries,
    invoiceNumbers
  };
};
