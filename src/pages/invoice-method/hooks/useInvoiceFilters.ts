
import { useCallback, useState } from "react";
import { Invoice } from "../types/invoice";

export interface FilterState {
  searchQuery: string;
  dateFrom: string;
  dateTo: string;
}

export const useInvoiceFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    dateFrom: "",
    dateTo: "",
  });

  const updateFilter = useCallback((field: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchQuery: "",
      dateFrom: "",
      dateTo: "",
    });
  }, []);

  const applyFilters = useCallback((invoices: Invoice[]): Invoice[] => {
    return invoices.filter(invoice => {
      // Filter by invoice number
      const matchesSearch = filters.searchQuery 
        ? invoice.invoiceNumber.toLowerCase().includes(filters.searchQuery.toLowerCase())
        : true;
      
      // Filter by date range
      const invoiceDate = new Date(invoice.date);
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null;
      
      const isAfterFromDate = fromDate ? invoiceDate >= fromDate : true;
      const isBeforeToDate = toDate ? invoiceDate <= toDate : true;
      
      return matchesSearch && isAfterFromDate && isBeforeToDate;
    });
  }, [filters]);

  return {
    filters,
    updateFilter,
    resetFilters,
    applyFilters
  };
};
