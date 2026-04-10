
import React, { useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PaymentHeader from "./components/PaymentHeader";
import SearchFilters from "./components/SearchFilters";
import StatusTabs from "./components/StatusTabs";
import { useInvoiceData } from "./hooks/useInvoiceData";
import { useInvoiceFilters } from "./hooks/useInvoiceFilters";
import { toast } from "sonner";
import PaymentReceiptHandler from "./components/PaymentReceiptHandler";
import DigitalCalculator from "@/components/calculator/DigitalCalculator";
import WarehouseStorageInvoiceList from "@/components/warehouse/WarehouseStorageInvoiceList";

const PaymentReceivable = () => {
  const { invoices } = useInvoiceData();
  const { filters, updateFilter, resetFilters, applyFilters } = useInvoiceFilters();
  
  // Apply filters to invoices
  const filteredInvoices = useMemo(() => {
    return applyFilters(invoices);
  }, [invoices, applyFilters]);
  
  // Handle apply filters with feedback
  const handleApplyFilters = () => {
    // If filters are active, show how many results were found
    if (filters.searchQuery || filters.dateFrom || filters.dateTo) {
      const filteredCount = filteredInvoices.length;
      const message = filteredCount > 0 
        ? `Found ${filteredCount} matching invoice${filteredCount !== 1 ? 's' : ''}`
        : 'No invoices match your filters';
      
      toast.info(message);
    }
  };

  return (
    <Layout title="Payment Receivable">
      <div className="space-y-6">
        <PaymentHeader />
        <SearchFilters 
          filters={filters}
          onUpdateFilter={updateFilter}
          onResetFilters={resetFilters}
          onApplyFilters={handleApplyFilters}
        />
        <StatusTabs invoices={filteredInvoices} />
        
        {/* Warehouse Storage Invoices Section */}
        <WarehouseStorageInvoiceList />
        
        <PaymentReceiptHandler />
        <DigitalCalculator />
      </div>
    </Layout>
  );
};

export default PaymentReceivable;
