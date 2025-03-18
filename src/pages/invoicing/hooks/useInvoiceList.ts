
import { useState } from "react";
import { mockInvoiceData } from "@/data/mockData";

export const useInvoiceList = () => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [branch, setBranch] = useState("ALL");
  const [sector, setSector] = useState("ALL");
  const [transport, setTransport] = useState("ALL");
  const [door, setDoor] = useState("ALL");
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const handlePrintInvoice = (invoiceId: string) => {
    window.open(`/data-entry/invoicing/print/${invoiceId}`, '_blank');
  };

  const filteredData = mockInvoiceData.filter(
    (item) =>
      (searchText === "" || 
        item.id.toLowerCase().includes(searchText.toLowerCase()) || 
        item.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) || 
        item.customer.toLowerCase().includes(searchText.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  
  // Get unique invoice numbers for the dropdown
  const invoiceNumbers = [...new Set(mockInvoiceData.map(i => i.invoiceNumber))];

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
