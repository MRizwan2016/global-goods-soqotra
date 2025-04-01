
import Layout from "@/components/layout/Layout";
import BillOfLadingTable from "./components/BillOfLadingTable";
import BillOfLadingFilters from "./components/BillOfLadingFilters";
import BillOfLadingPagination from "./components/BillOfLadingPagination";
import { useBillOfLadingList } from "./hooks/useBillOfLadingList";

const BillOfLadingList = () => {
  const {
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
    handleDeleteClick
  } = useBillOfLadingList();

  return (
    <Layout title="Bill of Lading Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <h3 className="text-lg font-medium text-green-800">Bill of Lading Records</h3>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          <BillOfLadingFilters
            origin={origin}
            setOrigin={setOrigin}
            destination={destination}
            setDestination={setDestination}
            cargoType={cargoType}
            setCargoType={setCargoType}
            status={status}
            setStatus={setStatus}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          
          <BillOfLadingTable
            currentEntries={currentEntries}
            indexOfFirstEntry={indexOfFirstEntry}
            handlePrintClick={handlePrintClick}
            handleDeleteClick={handleDeleteClick}
          />
          
          <BillOfLadingPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            indexOfFirstEntry={indexOfFirstEntry}
            indexOfLastEntry={indexOfLastEntry}
            totalEntries={filteredData.length}
          />
        </div>
      </div>
    </Layout>
  );
};

export default BillOfLadingList;
