
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockInvoiceData } from "@/data/mockData";
import { toast } from "sonner";

export const useInvoiceList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [branch, setBranch] = useState("all");
  const [sector, setSector] = useState("all");
  const [transport, setTransport] = useState("all");
  const [door, setDoor] = useState("all");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  
  const entriesPerPage = 10;
  
  const [invoices, setInvoices] = useState<any[]>([]);
  
  useEffect(() => {
    // Load invoices from localStorage if available
    try {
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const parsedInvoices = JSON.parse(storedInvoices);
        setInvoices(parsedInvoices);
      } else {
        // Use mock data if no local storage data
        setInvoices(mockInvoiceData);
      }
    } catch (error) {
      console.error("Error loading invoices:", error);
      // Fallback to mock data
      setInvoices(mockInvoiceData);
    }
  }, []);
  
  const filteredData = invoices.filter((item) => {
    // Filter by search text
    const matchesSearch = 
      searchText === "" || 
      (item.consignee1 && item.consignee1.toLowerCase().includes(searchText.toLowerCase())) || 
      (item.shipper1 && item.shipper1.toLowerCase().includes(searchText.toLowerCase())) ||
      (item.invoiceNumber && item.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()));
    
    // Filter by branch
    const matchesBranch = branch === "all" || item.branch === branch;
    
    // Filter by sector
    const matchesSector = sector === "all" || item.sector === sector;
    
    // Filter by transport
    const matchesTransport = transport === "all" || item.transportType === transport;
    
    // Filter by door to door
    const matchesDoor = door === "all" || 
      (door === "yes" && item.doorToDoor === true) || 
      (door === "no" && item.doorToDoor === false);
    
    // Filter by invoice number
    const matchesInvoiceNumber = 
      invoiceNumber === "" || 
      (item.invoiceNumber && item.invoiceNumber.includes(invoiceNumber));
    
    return matchesSearch && matchesBranch && matchesSector && 
      matchesTransport && matchesDoor && matchesInvoiceNumber;
  });
  
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  
  const handlePrintInvoice = (id: string) => {
    // Navigate to the print page with the correct ID
    console.log("Print invoice clicked for ID:", id);
    navigate(`/data-entry/print-documents/invoice-print/${id}`);
    toast.success("Opening invoice for printing");
  };
  
  const handleViewInvoice = (id: string) => {
    console.log("View invoice clicked for ID:", id);
    navigate(`/reports/cargo/invoice/${id}`);
    toast.success("Opening invoice details");
  };
  
  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
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
    handleViewInvoice,
    filteredData,
    totalPages,
    indexOfLastEntry,
    indexOfFirstEntry,
    currentEntries,
  };
};
