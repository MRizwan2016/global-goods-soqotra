
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FormState, PackageItem } from "../types/invoiceForm";
import { mockInvoiceData } from "@/data/mockData";

interface UseInvoiceLoaderParams {
  id?: string;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  setPackageItems: React.Dispatch<React.SetStateAction<PackageItem[]>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useInvoiceLoader = ({ id, setFormState, setPackageItems, setIsEditing }: UseInvoiceLoaderParams) => {
  const navigate = useNavigate();
  
  // Load invoice data for editing
  const loadInvoice = (invoiceId: string) => {
    // First try to get from localStorage for real data
    const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const storedInvoice = storedInvoices.find((inv: any) => inv.id === invoiceId);
    
    // Fall back to mock data if not found in localStorage
    const invoice = storedInvoice || mockInvoiceData.find(inv => inv.id === invoiceId);
    
    if (invoice) {
      console.log("Loading invoice data:", invoice);
      
      // Convert boolean values to strings and number to strings since our form state uses strings
      const formattedInvoice = {
        // Ensure these boolean fields are strings as expected by FormState
        doorToDoor: invoice.doorToDoor === true ? "Yes" : "No",
        // Handle potentially missing properties by using default values
        giftCargo: (invoice as any).giftCargo === true ? "Yes" : "No",
        prePaid: (invoice as any).prePaid === true ? "Yes" : "No",
        // Ensure numeric fields are converted to strings
        packages: String(invoice.packages || ""),
        volume: String(invoice.volume || ""),
        weight: String(invoice.weight || ""),
        gross: String(invoice.gross || "0"),
        discount: String(invoice.discount || "0"),
        net: String(invoice.net || "0"),
        ...invoice
      };
      
      setFormState(prev => ({
        ...prev,
        ...formattedInvoice
      }));
      
      // Set package items if available
      if (invoice.packageDetails && Array.isArray(invoice.packageDetails)) {
        // Ensure all required fields are present in the package items
        const formattedPackageItems: PackageItem[] = invoice.packageDetails.map(pkg => ({
          id: pkg.id || `pkg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: pkg.name || '',
          length: pkg.length || '',
          width: pkg.width || '',
          height: pkg.height || '',
          volume: pkg.volume || '',
          weight: pkg.weight || '',
          boxNumber: pkg.boxNumber || '',
          volumeWeight: pkg.volumeWeight || '',
          price: (pkg as any).price || '0',
          documentsFee: (pkg as any).documentsFee || '0',
          total: (pkg as any).total || '0'
        }));
        
        setPackageItems(formattedPackageItems);
      }
    } else {
      toast.error("Invoice not found");
      navigate("/data-entry/invoicing");
    }
  };

  return {
    loadInvoice,
    isEditing: !!id
  };
};
