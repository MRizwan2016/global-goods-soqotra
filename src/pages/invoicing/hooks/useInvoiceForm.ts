
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { PackageItem, FormState } from "../types/invoiceForm";
import { useFormHandling } from "./useFormHandling";
import { usePackageHandling } from "./usePackageHandling";
import { useInvoiceLoader } from "./useInvoiceLoader";
import { useInvoiceSelection } from "./useInvoiceSelection";
import { useSaveInvoice } from "./useSaveInvoice";
import { JobNumberService } from "@/services/JobNumberService";
import { ensureInvoiceAvailability } from "../utils/invoiceNumberGenerator";

export const useInvoiceForm = (id?: string) => {
  const [formState, setFormState] = useState<FormState>({
    currency: "QAR",  // Default
    date: new Date().toISOString().split('T')[0],
    
    invoiceNumber: "",
    bookingFormNumber: "",
    airwayBillNumber: "",
    destination: "",
    salesAgent: "",
    remarks: "",
    jobNumber: "",
    
    shipper1: "",
    shipperMobile: "",
    shipperEmail: "",
    shipperCity: "",
    
    consignee1: "",
    consigneeMobile: "",
    consigneeEmail: "",
    consigneeCity: "",
    
    packagesName: "",
    length: "",
    width: "",
    height: "",
    cubicMetre: "",
    packageWeight: "",
    boxNumber: "",
    price: "",
    documentsFee: "",
    total: "",
    
    paymentMethod: "CASH",
    paymentStatus: "PAID",
    paymentDate: new Date().toISOString().split('T')[0],
    bankingDate: new Date().toISOString().split('T')[0],
    
    gross: "0",
    discount: "0",
    net: "0",
    
    country: "",
    sector: "",
    branch: "",
    warehouse: "",
    district: "",
    
    packages: "0",
    weight: "0",
    volume: "0",
    doorToDoor: "",
    freightBy: "",
    invoiceDate: "",
    salesRep: "",
    driver: "",
    catZone: "",
    giftCargo: "",
    prePaid: "",
    selectedPackage: null,
    cubicFeet: "",
    volumeWeight: "",
    handOverBy: "",
    shipper2: "",
    shipperIdNumber: "",
    collectionAddress: "",
    consignee2: "",
    address: "",
    consigneeLandline: "",
    consigneeIdNumber: "",
    freight: "",
    destinationTransport: "",
    document: "",
    localTransport: "",
    packing: "",
    storage: "",
    destinationClearing: "",
    destinationDoorDelivery: "",
    other: "",
    agentName: "",
    agentNumber: "",
    subZone: "",
  });

  const [packageItems, setPackageItems] = useState<PackageItem[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(!!id);
  
  // Use invoice selection hook to handle invoice selection
  const {
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    handleSelectInvoice
  } = useInvoiceSelection(isEditing, setFormState);

  // Ensure invoice numbers are available when the form loads
  useEffect(() => {
    if (!isEditing) {
      try {
        ensureInvoiceAvailability();
        console.log("Invoice availability ensured");
      } catch (error) {
        console.error("Error ensuring invoice availability:", error);
        toast.error("There was an issue loading invoice numbers. You may need to enter them manually.");
      }
    }
  }, [isEditing]);
  
  // Debug logs to track form state
  useEffect(() => {
    console.log("Current form state:", formState);
  }, [formState]);
  
  // Generate job number when invoice number and country change
  useEffect(() => {
    if (!isEditing && !formState.jobNumber && formState.country) {
      const existingJobNumber = JobNumberService.getJobNumberByInvoice(formState.invoiceNumber);
      
      if (existingJobNumber) {
        setFormState(prev => ({
          ...prev,
          jobNumber: existingJobNumber
        }));
      }
    }
  }, [formState.country, formState.invoiceNumber, isEditing, formState.jobNumber]);

  const { 
    handlePackageSelect: baseHandlePackageSelect,
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage,
    updatePackagePricingByCountry
  } = usePackageHandling({
    formState,
    setFormState,
    packageItems,
    setPackageItems
  });

  const { handleInputChange, handleSelectChange } = useFormHandling(
    formState, 
    setFormState,
    updatePackagePricingByCountry
  );

  const updatePackagePricing = () => {
    updatePackagePricingByCountry();
  };

  // Load invoice data when editing
  const { loadInvoice } = useInvoiceLoader({
    id,
    setFormState,
    setPackageItems,
    setIsEditing
  });

  useEffect(() => {
    if (id) {
      loadInvoice(id);
    }
  }, [id, loadInvoice]);

  const handlePackageSelect = (description: string) => {
    baseHandlePackageSelect(description);
  };

  // Save invoice using the useSaveInvoice hook
  const { handleSave, savedInvoiceId } = useSaveInvoice({
    formState,
    packageItems,
    isEditing,
    id
  });

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
    updatePackagePricing,
  };
};
