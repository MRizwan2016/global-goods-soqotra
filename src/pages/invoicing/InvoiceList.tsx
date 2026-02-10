
import React, { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useInvoiceList } from "./hooks/useInvoiceList";
import InvoiceFilters from "./components/InvoiceFilters";
import InvoiceListControls from "./components/InvoiceListControls";
import InvoiceTable from "./components/InvoiceTable";
import InvoicePagination from "./components/InvoicePagination";
import { toast } from "sonner";

const InvoiceList = () => {
  const {
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
  } = useInvoiceList();

  useEffect(() => {
    console.log("Invoice list component mounted");
    // Check if there are any invoices in localStorage
    const storedInvoices = localStorage.getItem('invoices');
    if (!storedInvoices || JSON.parse(storedInvoices).length === 0) {
      console.log("No invoices found in localStorage");
    } else {
      console.log(`Found ${JSON.parse(storedInvoices).length} invoices in localStorage`);
    }
  }, []);

  return (
    <Layout title="Invoice Management">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
         <div className="p-4 bg-[#f0f3f8] border-b border-[#d6dce8]">
          <h3 className="text-lg font-medium text-[#1e2a3a]">View Invoice Record Listed</h3>
        </div>
        
        <div className="p-4 flex flex-col gap-4">
          <InvoiceFilters 
            sector={sector}
            setSector={setSector}
            branch={branch}
            setBranch={setBranch}
            transport={transport}
            setTransport={setTransport}
            door={door}
            setDoor={setDoor}
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
          />
          
          <InvoiceListControls 
            searchText={searchText}
            setSearchText={setSearchText}
          />
          
          <InvoiceTable 
            currentEntries={currentEntries}
            indexOfFirstEntry={indexOfFirstEntry}
            handlePrintInvoice={handlePrintInvoice}
            handleViewInvoice={handleViewInvoice}
            handleInactivateInvoice={handleInactivateInvoice}
          />
          
          <InvoicePagination 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            filteredDataLength={filteredData.length}
            indexOfFirstEntry={indexOfFirstEntry}
            indexOfLastEntry={indexOfLastEntry}
          />
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceList;
