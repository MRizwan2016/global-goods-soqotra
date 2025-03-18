
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useFormHandling } from "./useFormHandling";
import { usePackageHandling } from "./usePackageHandling";
import { useInvoiceSelection } from "./useInvoiceSelection";
import { useInvoiceSubmit } from "./useInvoiceSubmit";
import { FormState } from "../types/invoiceForm";
import { mockInvoiceData } from "@/data/mockData";
import { DEFAULT_COUNTRY, DEFAULT_WAREHOUSE } from "../constants/locationData";
import { countrySectorMap } from "../constants/countrySectorMap";

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
  const navigate = useNavigate();
  const isEditing = !!id;
  const [savedInvoiceId, setSavedInvoiceId] = useState<string | null>(null);
  
  // Get form state and handlers
  const { formState, setFormState, handleInputChange, handleSelectChange } = useFormHandling(initialFormState);
  
  // Get package handlers
  const { 
    packageItems, 
    setPackageItems,
    handlePackageSelect, 
    handleManualPackage, 
    handleAddPackage, 
    handleRemovePackage
  } = usePackageHandling(formState, setFormState);
  
  // Get invoice selection handlers
  const {
    showInvoiceSelector,
    setShowInvoiceSelector,
    availableInvoices,
    handleSelectInvoice: selectInvoice
  } = useInvoiceSelection(isEditing);
  
  // Get submit handler
  const { handleSubmit } = useInvoiceSubmit();
  
  // Combine handlers
  const handleSelectInvoice = (invoiceNumber: string) => selectInvoice(invoiceNumber, setFormState);
  
  // Load invoice data for editing
  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch invoice by ID from API
      // For now, use mock data
      const invoice = mockInvoiceData.find(inv => inv.id === id);
      
      if (invoice) {
        setFormState({
          ...initialFormState,
          ...invoice,
        });
        
        // Set package items if available
        if (invoice.packageDetails && Array.isArray(invoice.packageDetails)) {
          setPackageItems(invoice.packageDetails);
        }
      } else {
        toast.error("Invoice not found");
        navigate("/data-entry/invoicing");
      }
    }
  }, [id, isEditing]);
  
  // Handle saving the invoice
  const handleSave = async () => {
    // Validate required fields
    if (!formState.invoiceNumber) {
      toast.error("Please select an invoice number");
      return;
    }
    
    if (!formState.consignee1) {
      toast.error("Please enter a consignee name");
      return;
    }
    
    try {
      // In a real app, this would be an API call
      const savedId = await handleSubmit(formState, packageItems, isEditing, id);
      
      // Store the saved invoice ID
      setSavedInvoiceId(savedId);
      
      toast.success(`Invoice ${isEditing ? 'updated' : 'created'} successfully`);
      
      if (!isEditing) {
        // If creating a new invoice, either redirect or reset form
        navigate(`/data-entry/invoicing/edit/${savedId}`);
      }
    } catch (error) {
      toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
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
    handleManualPackage,
    handleAddPackage,
    handleRemovePackage,
    handleSelectInvoice,
    handleSave,
    savedInvoiceId: savedInvoiceId || id,
  };
};
