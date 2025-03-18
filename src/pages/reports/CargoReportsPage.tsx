
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription } from "@/components/ui/dialog";
import Layout from "@/components/layout/Layout";
import { InvoiceDetailsView } from "@/components/reports/InvoiceDetailsView";
import { useCargoReportsData } from "./hooks/useCargoReportsData";

// Import refactored components
import ReportHeader from "./components/ReportHeader";
import FilterBar from "./components/filters/FilterBar";
import SearchToolbar from "./components/search/SearchToolbar";
import CargoReportsTable from "./components/table/CargoReportsTable";
import TablePagination from "./components/pagination/TablePagination";

const CargoReportsPage = () => {
  const {
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
    setIsDetailsOpen,
    
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
  } = useCargoReportsData();

  // Apply fullscreen-specific styles
  const containerClasses = isFullScreen 
    ? "fixed inset-0 z-50 bg-white p-4 overflow-y-auto animate-fade-in" 
    : "bg-white rounded-lg shadow-sm border border-gray-200";

  return (
    <Layout title="Cargo Reports">
      <div className={containerClasses}>
        <ReportHeader 
          title="View Invoice Record Listed" 
          isFullScreen={isFullScreen}
          toggleFullScreen={toggleFullScreen}
        />
        
        <div className={`p-4 flex flex-col gap-4 ${isFullScreen ? 'animate-fade-in' : ''}`}>
          <FilterBar 
            sector={sector}
            setSector={setSector}
            branch={branch}
            setBranch={setBranch}
            transport={transport}
            setTransport={setTransport}
            warehouses={warehouses}
            setWarehouses={setWarehouses}
            zones={zones}
            setZones={setZones}
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
          />
          
          <SearchToolbar 
            searchText={searchText}
            setSearchText={setSearchText}
            searchField={searchField}
            setSearchField={setSearchField}
            entriesPerPage={entriesPerPage}
          />
          
          <CargoReportsTable 
            currentEntries={currentEntries}
            indexOfFirstEntry={indexOfFirstEntry}
            onViewInvoice={handleViewInvoice}
          />
          
          <TablePagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            filteredDataLength={filteredData.length}
            indexOfFirstEntry={indexOfFirstEntry}
            indexOfLastEntry={indexOfLastEntry}
          />
        </div>
      </div>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <DialogDescription className="sr-only">
            View invoice details and manage them
          </DialogDescription>
          {selectedInvoice && <InvoiceDetailsView invoice={selectedInvoice} onClose={handleCloseDetails} />}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default CargoReportsPage;
