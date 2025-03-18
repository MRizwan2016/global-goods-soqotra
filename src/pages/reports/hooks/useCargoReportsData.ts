
import { useState, useMemo } from "react";
import { mockInvoiceData } from "@/data/mockData";

export const useCargoReportsData = () => {
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [branch, setBranch] = useState("ALL");
  const [sector, setSector] = useState("ALL");
  const [transport, setTransport] = useState("ALL");
  const [warehouses, setWarehouses] = useState("ALL");
  const [zones, setZones] = useState("ALL");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // For invoice details dialog
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Mock data transformed for cargo reports with transport property added
  const cargoData = useMemo(() => mockInvoiceData.map(item => ({
    ...item,
    zone: ["Normal Rate", "Special Rate", "Corporate Rate"][Math.floor(Math.random() * 3)],
    warehouse: ["Galle", "Kurunegala", "Colombo", "Kandy"][Math.floor(Math.random() * 4)],
    entryBy: `alihq#${item.date.split('/').join('')}`,
    payStatus: ["Un-Settle", "Settled", "Partial"][Math.floor(Math.random() * 3)],
    due: item.paid ? 0 : item.net,
    transport: ["SEA", "AIR"][Math.floor(Math.random() * 2)], // Added transport property
    shipperMobile: `${Math.floor(10000000 + Math.random() * 90000000)}`,
    consigneeMobile: `${Math.floor(10000000 + Math.random() * 90000000)}`,
    passport: `N${Math.floor(1000000 + Math.random() * 9000000)}`
  })), []);

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedInvoice(null);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };

  const filteredData = useMemo(() => cargoData.filter((item) => {
    // First apply dropdown filters
    if (branch !== "ALL" && item.branch !== branch) return false;
    if (sector !== "ALL" && item.sector !== sector) return false;
    if (transport !== "ALL" && item.transport !== transport) return false;
    if (warehouses !== "ALL" && item.warehouse !== warehouses) return false;
    if (zones !== "ALL" && item.zone !== zones) return false;
    if (invoiceNumber && item.invoiceNumber !== invoiceNumber) return false;

    // If no search text, return all items that passed the filters
    if (searchText === "") return true;

    const searchLower = searchText.toLowerCase();

    // Then apply text search based on selected field
    switch (searchField) {
      case "invoiceNumber":
        return item.invoiceNumber.toLowerCase().includes(searchLower);
      case "shipperName":
        return item.shipper1?.toLowerCase().includes(searchLower);
      case "shipperMobile":
        return item.shipperMobile?.toLowerCase().includes(searchLower);
      case "consigneeName":
        return item.consignee1?.toLowerCase().includes(searchLower);
      case "consigneeMobile":
        return item.consigneeMobile?.toLowerCase().includes(searchLower);
      case "all":
      default:
        return (
          item.id.toLowerCase().includes(searchLower) ||
          item.invoiceNumber.toLowerCase().includes(searchLower) ||
          item.customer.toLowerCase().includes(searchLower) ||
          item.shipper1?.toLowerCase().includes(searchLower) ||
          item.shipperMobile?.toLowerCase().includes(searchLower) ||
          item.consignee1?.toLowerCase().includes(searchLower) ||
          item.consigneeMobile?.toLowerCase().includes(searchLower) ||
          item.passport?.toLowerCase().includes(searchLower)
        );
    }
  }), [cargoData, searchText, searchField, branch, sector, transport, warehouses, zones, invoiceNumber]);

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  
  // Reset to first page when filters change
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  return {
    // State values
    searchText,
    setSearchText,
    searchField,
    setSearchField,
    currentPage,
    setCurrentPage,
    entriesPerPage,
    branch,
    setBranch,
    sector,
    setSector,
    transport,
    setTransport,
    warehouses,
    setWarehouses,
    zones,
    setZones,
    invoiceNumber,
    setInvoiceNumber,
    isFullScreen,
    selectedInvoice,
    isDetailsOpen,
    
    // Computed values
    filteredData,
    totalPages,
    indexOfLastEntry,
    indexOfFirstEntry,
    currentEntries,
    
    // Functions
    handleViewInvoice,
    handleCloseDetails,
    toggleFullScreen,
  };
};
