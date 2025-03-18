
import { useState, useEffect } from "react";
import { FormState, InvoiceFormReturnType, PackageItem } from "../types/invoiceForm";
import { countrySectorMap } from "../constants/countrySectorMap";
import { useFormHandling } from "./useFormHandling";
import { usePackageHandling } from "./usePackageHandling";
import { useInvoiceSelection } from "./useInvoiceSelection";
import { useInvoiceSubmit } from "./useInvoiceSubmit";
import { findExistingInvoice, initializeFormState, initializePackageItems } from "../utils/invoiceUtils";

// Create the main hook that combines all the modules
export const useInvoiceForm = (id?: string): InvoiceFormReturnType => {
  const isEditing = Boolean(id);
  
  // Find existing invoice if editing
  const existingInvoice = findExistingInvoice(id);
    
  // Initialize the form state
  const initialState = initializeFormState(existingInvoice);

  // Use the form handling module
  const { formState, setFormState, handleInputChange, handleSelectChange } = 
    useFormHandling(initialState);
  
  // Use the package handling module
  const { packageItems, setPackageItems, handlePackageSelect, handleAddPackage, handleRemovePackage } = 
    usePackageHandling(formState, setFormState);
  
  // Initialize packageItems with existing invoice data if editing
  useEffect(() => {
    if (existingInvoice) {
      const initialPackages = initializePackageItems(existingInvoice);
      setPackageItems(initialPackages);
    }
  }, [existingInvoice, setPackageItems]);
  
  // Use the invoice selection module
  const { showInvoiceSelector, setShowInvoiceSelector, availableInvoices, handleSelectInvoice: baseHandleSelectInvoice } = 
    useInvoiceSelection(isEditing);
  
  // Use the invoice submission module
  const { handleSave: baseHandleSave } = useInvoiceSubmit();
  
  // Create a wrapper for handleSelectInvoice that includes setFormState
  const handleSelectInvoice = (invoiceNumber: string) => {
    baseHandleSelectInvoice(invoiceNumber, setFormState);
  };
  
  // Create a wrapper for handleSave that passes the required state
  const handleSave = () => {
    baseHandleSave(formState, packageItems);
  };

  return {
    formState,
    packageItems,
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    isEditing,
    handleInputChange,
    handleSelectChange,
    handlePackageSelect,
    handleAddPackage,
    handleRemovePackage,
    handleSelectInvoice,
    handleSave,
    countrySectorMap
  };
};

// Re-export calculations function from the utils file
export { calculateNet } from "../utils/invoiceCalculations";
