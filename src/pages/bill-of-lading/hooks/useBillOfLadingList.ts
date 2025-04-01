
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  getBillOfLadingData, 
  filterBillOfLadingData, 
  paginateBillOfLadingData,
  deleteBillOfLading
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
  const [refreshKey, setRefreshKey] = useState(0); // Used to force re-render

  // Get all data - with the refreshKey dependency to refresh when data changes
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
    if (window.confirm("Are you sure you want to delete this Bill of Lading?")) {
      try {
        const deleted = deleteBillOfLading(id);
        if (deleted) {
          toast.success("Bill of Lading deleted successfully");
          setRefreshKey(prev => prev + 1); // Force refresh
        } else {
          toast.error("Failed to delete Bill of Lading");
        }
      } catch (error) {
        console.error("Error deleting Bill of Lading:", error);
        toast.error("An error occurred while deleting");
      }
    }
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
