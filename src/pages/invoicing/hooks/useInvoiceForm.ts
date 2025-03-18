
import { useState } from "react";
import { FormState } from "../types/invoiceForm";
import { useFormHandling } from "./useFormHandling";
import { usePackageHandling } from "./usePackageHandling";
import { useInvoiceSelection } from "./useInvoiceSelection";
import { useInvoiceLoader } from "./useInvoiceLoader";
import { useSaveInvoice } from "./useSaveInvoice";
import { countrySectorMap } from "../constants/countrySectorMap";
import { DEFAULT_COUNTRY, DEFAULT_WAREHOUSE } from "../constants/locationData";

// Initialize default form state
const initialFormState: FormState = {
  // Basic information
  sector: countrySectorMap[DEFAULT_COUNTRY] || "",
  branch: "",
  warehouse: DEFAULT_WAREHOUSE,
  salesRep: "",
  doorToDoor: "Yes",
  driver: "",
  district: "",
  volume: "",
  catZone: "Normal Rate",
  weight: "",
  freightBy: "Air",
  packages: "",
  invoiceNumber: "",
  remarks: "",
  invoiceDate: new Date().toISOString().split("T")[0],
  giftCargo: "No",
  prePaid: "Yes",
  country: DEFAULT_COUNTRY,
  
  // Package details
  packagesName: "",
  selectedPackage: null,
  length: "",
  width: "",
  height: "",
  cubicMetre: "",
  cubicFeet: "",
  packageWeight: "",
  boxNumber: "",
  volumeWeight: "",
  price: "",
  documentsFee: "",
  total: "",
  
  // Shipping details
  handOverBy: "Sales Rep",
  shipper1: "",
  shipper2: "",
  shipperMobile: "",
  shipperIdNumber: "",
  collectionAddress: "",
  shipperCity: "",
  
  consignee1: "",
  consignee2: "",
  address: "",
  consigneeCity: "",
  consigneeMobile: "",
  consigneeLandline: "",
  consigneeIdNumber: "",
  
  // Payment details
  freight: "0",
  destinationTransport: "0",
  document: "0",
  localTransport: "0",
  packing: "0",
  storage: "0",
  destinationClearing: "0",
  destinationDoorDelivery: "0",
  other: "0",
  gross: "0",
  discount: "0",
  net: "0",
  agentName: "",
  agentNumber: "",
  subZone: "",
  paymentMethod: "Cash",
  paymentStatus: "Paid",
  paymentDate: new Date().toISOString().split("T")[0],
  bankingDate: new Date().toISOString().split("T")[0],
};

export const useInvoiceForm = (id?: string) => {
  // Load invoice data if editing
  const {
    formState,
    setFormState,
    packageItems,
    setPackageItems,
    isEditing
  } = useInvoiceLoader(id, initialFormState);
  
  // Get form state and handlers
  const { handleInputChange, handleSelectChange } = useFormHandling(formState, setFormState);
  
  // Get package handlers
  const { 
    handlePackageSelect, 
    handleManualPackage, 
    handleAddPackage, 
    handleRemovePackage
  } = usePackageHandling(formState, setFormState, packageItems, setPackageItems);
  
  // Get invoice selection handlers
  const {
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    handleSelectInvoice
  } = useInvoiceSelection(isEditing, setFormState);
  
  // Get save invoice handlers
  const { handleSave, savedInvoiceId } = useSaveInvoice(formState, packageItems, isEditing, id);
  
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
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage,
    handleSelectInvoice,
    handleSave,
    savedInvoiceId,
  };
};
