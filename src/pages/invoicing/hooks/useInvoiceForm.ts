
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PackageItem, FormState, Invoice } from "../types/invoiceForm";
import { useFormHandling } from "./useFormHandling";
import { usePackageHandling } from "./usePackageHandling";
import { useInvoiceLoader } from "./useInvoiceLoader";
import { countrySectorMap } from "../constants/countrySectorMap";

export const useInvoiceForm = (id?: string) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormState>({
    currency: "QAR",  // Default
    date: new Date().toISOString().split('T')[0],
    
    // Other fields will be initialized based on whether we're editing or creating
    invoiceNumber: "",
    bookingFormNumber: "",
    airwayBillNumber: "",
    destination: "",
    salesAgent: "",
    remarks: "",
    
    // Shipper details
    shipper1: "",
    shipperMobile: "",
    shipperEmail: "",
    shipperCity: "",
    
    // Consignee details
    consignee1: "",
    consigneeMobile: "",
    consigneeEmail: "",
    consigneeCity: "",
    
    // Package details
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
    
    // Payment details
    paymentMethod: "CASH",
    paymentStatus: "PAID",
    paymentDate: new Date().toISOString().split('T')[0],
    bankingDate: new Date().toISOString().split('T')[0],
    
    // Amounts
    gross: "0",
    discount: "0",
    net: "0",
    
    // Location data
    country: "",
    sector: "",
    branch: "",
    warehouse: "",
    district: "",
    
    // Additional
    packages: "0",
    weight: "0",
    volume: "0",
    
    // Required fields with empty defaults
    salesRep: "",
    doorToDoor: "",
    driver: "",
    catZone: "",
    freightBy: "",
    invoiceDate: "",
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
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [availableInvoices, setAvailableInvoices] = useState<Invoice[]>([]);
  const [savedInvoiceId, setSavedInvoiceId] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(!!id);

  // Initialize package handling
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
  
  // Initialize form handling with package pricing update
  const { handleInputChange, handleSelectChange } = useFormHandling(
    formState, 
    setFormState,
    updatePackagePricingByCountry
  );

  // Expose package pricing update function for components
  const updatePackagePricing = () => {
    updatePackagePricingByCountry();
  };
  
  // Set up invoice loader with required parameters
  const { loadInvoice } = useInvoiceLoader({
    id,
    setFormState,
    setPackageItems,
    setIsEditing
  });

  // Load invoice data on mount if ID is provided
  useEffect(() => {
    if (id) {
      loadInvoice(id);
    }
  }, [id, loadInvoice]);

  // Wrap the package select handler to ensure proper updates
  const handlePackageSelect = (description: string) => {
    baseHandlePackageSelect(description);
  };

  // Handle selecting an invoice from the list
  const handleSelectInvoice = (invoice: Invoice) => {
    // Set form state with the selected invoice data
    setFormState(prev => ({
      ...prev,
      invoiceNumber: invoice.invoiceNumber,
      bookingFormNumber: invoice.bookingFormNumber || "",
      airwayBillNumber: invoice.airwayBillNumber || "",
      date: invoice.date || new Date().toISOString().split('T')[0],
      gross: String(invoice.gross || 0),
      discount: String(invoice.discount || 0),
      net: String(invoice.net || 0),
      remarks: invoice.remarks || ""
    }));
    
    // Hide the invoice selector
    setShowInvoiceSelector(false);
  };

  // Handle saving the invoice
  const handleSave = () => {
    try {
      // Validate required fields
      const requiredFields = ['invoiceNumber', 'country', 'destination', 'shipper1', 'consignee1'];
      const missingFields = requiredFields.filter(field => !formState[field as keyof FormState]);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in required fields: ${missingFields.join(', ')}`);
        return;
      }
      
      // Validate package items
      if (packageItems.length === 0) {
        toast.error("Please add at least one package");
        return;
      }
      
      // Create unique ID for new invoice
      const invoiceId = id || uuidv4();
      
      // Prepare invoice data
      const invoiceData = {
        id: invoiceId,
        ...formState,
        packageDetails: packageItems,
        // Add any additional fields needed for the invoice
      };
      
      // Save to local storage
      let storedInvoices: any[] = [];
      const storedInvoicesString = localStorage.getItem('invoices');
      
      if (storedInvoicesString) {
        storedInvoices = JSON.parse(storedInvoicesString);
      }
      
      // Update existing or add new
      if (id) {
        const index = storedInvoices.findIndex(inv => inv.id === id);
        if (index !== -1) {
          storedInvoices[index] = invoiceData;
        } else {
          storedInvoices.push(invoiceData);
        }
      } else {
        storedInvoices.push(invoiceData);
      }
      
      // Save back to local storage
      localStorage.setItem('invoices', JSON.stringify(storedInvoices));
      
      // Show success message
      toast.success(id ? "Invoice updated successfully" : "Invoice created successfully", {
        description: `Invoice ${formState.invoiceNumber} has been ${id ? 'updated' : 'created'}.`
      });
      
      // Store saved invoice ID 
      setSavedInvoiceId(invoiceId);
      
      // If creating a new invoice, reset or navigate
      if (!id) {
        navigate("/data-entry/invoicing");
      }
      
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to save invoice", {
        description: "There was an error while saving the invoice. Please try again."
      });
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
    savedInvoiceId,
    updatePackagePricing,
    countrySectorMap,
  };
};
