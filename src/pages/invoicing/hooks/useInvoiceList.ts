
import { useState, useEffect } from "react";
import { mockInvoiceData } from "@/data/mockData";

export const useInvoiceList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [invoiceData, setInvoiceData] = useState<any[]>([]);
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
      // Use updatedAt if available, otherwise fall back to date
      const dateA = a.updatedAt 
        ? new Date(a.updatedAt).getTime() 
        : a.date 
          ? new Date(a.date).getTime() 
          : 0;
      
      const dateB = b.updatedAt 
        ? new Date(b.updatedAt).getTime() 
        : b.date
          ? new Date(b.date).getTime()
          : 0;
      
      return dateB - dateA; // Sort in descending order (newest first)
    });
    
    setInvoiceData(mergedData);
    console.log("Loaded invoice data:", mergedData);
  }, []);

  const handlePrintInvoice = (invoiceId: string) => {
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
