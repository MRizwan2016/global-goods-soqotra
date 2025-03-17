
import { useState } from "react";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data/mockData";
import { countrySectorMap } from "../constants/countrySectorMap";
import { useFormHandling } from "./useFormHandling";
import { usePackageHandling } from "./usePackageHandling";
import { useInvoiceSelection } from "./useInvoiceSelection";
import { FormState, InvoiceFormReturnType } from "../types/invoiceForm";

// Create the main hook that combines all the modules
export const useInvoiceForm = (id?: string): InvoiceFormReturnType => {
  const isEditing = Boolean(id);
  
  const existingInvoice = isEditing 
    ? mockInvoiceData.find(inv => inv.id === id) 
    : null;
    
  // Initialize the form state
  const initialState: FormState = {
    sector: existingInvoice?.sector || "COLOMBO : C",
    branch: existingInvoice?.branch || "DOHA : HOF",
    warehouse: existingInvoice?.warehouse || "Colombo : C",
    salesRep: existingInvoice?.salesAgent || "",
    doorToDoor: existingInvoice?.doorToDoor ? "YES" : "NO",
    driver: existingInvoice?.driver || "",
    district: existingInvoice?.district || "COLOMBO : C - C",
    volume: existingInvoice?.volume || "0",
    catZone: existingInvoice?.catZone || "Normal Rate : 0",
    weight: existingInvoice?.weight || "0",
    freightBy: existingInvoice?.freightBy || "SEA",
    packages: existingInvoice?.packages || "0",
    invoiceNumber: existingInvoice?.invoiceNumber || "",
    remarks: existingInvoice?.remarks || "",
    invoiceDate: existingInvoice?.date || "",
    giftCargo: "NO",
    prePaid: "NO",
    country: existingInvoice?.country || "Sri Lanka",
    
    // Package details
    packagesName: "",
    selectedPackage: null,
    length: "",
    width: "",
    height: "",
    cubicMetre: "",
    cubicFeet: "",
    packageWeight: "0",
    boxNumber: "0",
    volumeWeight: "0",
    price: "0",
    documentsFee: "0",
    total: "0",
    
    // Shipping details
    handOverBy: existingInvoice?.handOverBy || "",
    shipper1: existingInvoice?.shipper1 || "",
    shipper2: existingInvoice?.shipper2 || "",
    shipperMobile: existingInvoice?.shipperMobile || "",
    shipperIdNumber: existingInvoice?.shipperIdNumber || "",
    collectionAddress: existingInvoice?.collectionAddress || "",
    shipperCity: existingInvoice?.shipperCity || "",
    
    consignee1: existingInvoice?.consignee1 || "",
    consignee2: existingInvoice?.consignee2 || "",
    address: existingInvoice?.address || "",
    consigneeCity: existingInvoice?.consigneeCity || "",
    consigneeMobile: existingInvoice?.consigneeMobile || "",
    consigneeLandline: existingInvoice?.consigneeLandline || "",
    consigneeIdNumber: existingInvoice?.consigneeIdNumber || "",
    
    // Payment details
    freight: existingInvoice?.gross || "0",
    destinationTransport: "0",
    document: "0",
    localTransport: "0",
    packing: "0",
    storage: "0",
    destinationClearing: "0",
    destinationDoorDelivery: "0",
    other: "0",
    gross: existingInvoice?.gross || "0",
    discount: existingInvoice?.discount || "0",
    net: existingInvoice?.net || "0",
    agentName: "",
    agentNumber: "0",
    subZone: "1 : Colombo",
    paymentMethod: "",
    paymentStatus: "",
    paymentDate: "",
    bankingDate: "",
  };

  // Use the form handling module
  const { formState, setFormState, handleInputChange, handleSelectChange } = 
    useFormHandling(initialState);
  
  // Use the package handling module
  const { packageItems, setPackageItems, handlePackageSelect, handleAddPackage, handleRemovePackage } = 
    usePackageHandling(formState, setFormState);
  
  // Initialize packageItems with existing invoice data if editing
  useState(() => {
    if (existingInvoice?.packageDetails) {
      setPackageItems(existingInvoice.packageDetails);
    }
  });
  
  // Use the invoice selection module
  const { showInvoiceSelector, setShowInvoiceSelector, availableInvoices, handleSelectInvoice: baseHandleSelectInvoice } = 
    useInvoiceSelection(isEditing);
  
  // Create a wrapper for handleSelectInvoice that includes setFormState
  const handleSelectInvoice = (invoiceNumber: string) => {
    baseHandleSelectInvoice(invoiceNumber, setFormState);
  };
  
  // Handle form submission
  const handleSave = () => {
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      return;
    }
    
    console.log("Saving invoice:", { ...formState, packageItems });
    toast.success("Invoice saved successfully");
    
    window.location.href = "/data-entry/invoicing";
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

// Re-export countrySectorMap for backwards compatibility
export { countrySectorMap } from "../constants/countrySectorMap";
export { mockInvoiceBooks } from "../constants/mockInvoiceBooks";
export { calculateNet } from "../utils/invoiceCalculations";
