
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  getBillOfLadingData, 
  filterBillOfLadingData, 
  paginateBillOfLadingData,
  BillOfLading
} from "../services/BillOfLadingService";

export const useBillOfLadingList = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 50;
  const [origin, setOrigin] = useState("ALL");
  const [destination, setDestination] = useState("ALL");
  const [cargoType, setCargoType] = useState("ALL");
  const [status, setStatus] = useState("ALL");

  // Get all data
  const allData = getBillOfLadingData();
  
  // Apply filters
  const filteredData = filterBillOfLadingData(
    allData,
    searchText,
    origin,
    destination,
    cargoType,
    status
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = paginateBillOfLadingData(
    filteredData,
    currentPage,
    entriesPerPage
  );

  const handlePrintClick = (id: string) => {
    navigate(`/data-entry/print-documents/bl-preview/${id}?type=house`);
    toast.success("Opening Bill of Lading preview");
  };

  const handleDeleteClick = (id: string) => {
    toast.error("Delete functionality is not implemented");
  };

  return {
    searchText,
    setSearchText,
    currentPage,
    setCurrentPage,
    origin,
    setOrigin,
    destination,
    setDestination,
    cargoType,
    setCargoType,
    status,
    setStatus,
    totalPages,
    filteredData,
    currentEntries,
    indexOfFirstEntry,
    indexOfLastEntry,
    handlePrintClick,
    handleDeleteClick,
    entriesPerPage
  };
};
