
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
    // Load invoices from all sources: localStorage, eritreaInvoices, generatedInvoices
    try {
      let allInvoices = [];
      
      // Load main invoices
      const storedInvoices = localStorage.getItem('invoices');
      if (storedInvoices) {
        const parsedInvoices = JSON.parse(storedInvoices);
        allInvoices = [...allInvoices, ...parsedInvoices];
      }
      
      // Load Eritrea invoices
      const eritreaInvoices = localStorage.getItem('eritreaInvoices');
      if (eritreaInvoices) {
        const parsedEritreaInvoices = JSON.parse(eritreaInvoices);
        allInvoices = [...allInvoices, ...parsedEritreaInvoices];
      }
      
      // Load generated invoices
      const generatedInvoices = localStorage.getItem('generatedInvoices');
      if (generatedInvoices) {
        const parsedGeneratedInvoices = JSON.parse(generatedInvoices);
        allInvoices = [...allInvoices, ...parsedGeneratedInvoices];
      }
      
      // Load Philippines invoices
      const philippinesInvoices = localStorage.getItem('philippinesInvoices');
      if (philippinesInvoices) {
        const parsedPhilippinesInvoices = JSON.parse(philippinesInvoices);
        allInvoices = [...allInvoices, ...parsedPhilippinesInvoices];
      }
      
      // Include mock data for demonstration
      allInvoices = [...allInvoices, ...mockInvoiceData];
      
      // Remove duplicates based on invoice number
      const uniqueInvoices = allInvoices.filter((invoice, index, self) => 
        index === self.findIndex(i => i.invoiceNumber === invoice.invoiceNumber)
      );
      
      setInvoices(uniqueInvoices);
      console.log("Loaded invoices from all sources:", uniqueInvoices.length, "total invoices");
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

  const handleInactivateInvoice = (id: string, invoiceNumber: string) => {
    try {
      // Find the invoice in the current list
      const invoiceToInactivate = invoices.find(inv => inv.id === id || inv.invoiceNumber === invoiceNumber);
      
      if (!invoiceToInactivate) {
        toast.error("Invoice not found");
        return;
      }

      // Mark as inactive
      const updatedInvoice = { ...invoiceToInactivate, status: 'inactive', isActive: false };
      
      // Update all possible storage locations
      const storageKeys = ['invoices', 'eritreaInvoices', 'generatedInvoices', 'philippinesInvoices'];
      
      storageKeys.forEach(key => {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            const updatedData = parsedData.map((inv: any) => 
              (inv.id === id || inv.invoiceNumber === invoiceNumber) 
                ? updatedInvoice 
                : inv
            );
            localStorage.setItem(key, JSON.stringify(updatedData));
          } catch (err) {
            console.error(`Error updating ${key}:`, err);
          }
        }
      });

      // Update local state
      setInvoices(prev => prev.map(inv => 
        (inv.id === id || inv.invoiceNumber === invoiceNumber) 
          ? updatedInvoice 
          : inv
      ));

      toast.success(`Invoice ${invoiceNumber} has been inactivated`);
    } catch (error) {
      console.error("Error inactivating invoice:", error);
      toast.error("Failed to inactivate invoice");
    }
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
    handleInactivateInvoice,
    filteredData,
    totalPages,
    indexOfLastEntry,
    indexOfFirstEntry,
    currentEntries,
  };
};
