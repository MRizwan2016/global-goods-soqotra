
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FormState, PackageItem } from "../types/invoiceForm";
import { mockInvoiceData } from "@/data/mockData";
import { findExistingInvoice, initializeFormState, initializePackageItems } from "../utils/invoiceUtils";

interface UseInvoiceLoaderParams {
  id?: string;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setPackageItems: React.Dispatch<React.SetStateAction<PackageItem[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useInvoiceLoader = ({ 
  id, 
  setFormState, 
  setPackageItems, 
  setIsEditing 
}: UseInvoiceLoaderParams) => {
  const navigate = useNavigate();
  
  // Load invoice data for editing
  const loadInvoice = useCallback((invoiceId: string) => {
    // First try to get from localStorage for real data
    const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const storedInvoice = storedInvoices.find((inv: any) => inv.id === invoiceId);
    
    // Fall back to mock data if not found in localStorage
    const invoice = storedInvoice || findExistingInvoice(invoiceId);
    
    if (invoice) {
      console.log("Loading invoice data:", invoice);
      
      // Initialize form state with values from the invoice
      const initialFormState = initializeFormState(invoice);
      setFormState(initialFormState);
      
      // Set package items if available
      const packageItemsData = initializePackageItems(invoice);
      setPackageItems(packageItemsData);
      
      // Set editing mode
      setIsEditing(true);
    } else {
      toast.error("Invoice not found");
      navigate("/data-entry/invoicing");
    }
  }, [setFormState, setPackageItems, setIsEditing, navigate]);

  return {
    loadInvoice,
    isEditing: !!id
  };
};
