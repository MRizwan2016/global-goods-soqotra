import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { PackageItem, FormState, Invoice } from "../types/invoiceForm";
import { useFormHandling } from "./useFormHandling";
import { usePackageHandling } from "./usePackageHandling";
import { useInvoiceLoader } from "./useInvoiceLoader";
import { countrySectorMap } from "../constants/countrySectorMap";
import { JobNumberService } from "@/services/JobNumberService";

export const useInvoiceForm = (id?: string) => {
  const navigate = useNavigate();
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
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [availableInvoices, setAvailableInvoices] = useState<Invoice[]>([]);
  const [savedInvoiceId, setSavedInvoiceId] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(!!id);

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

  const updatePackagePricing = () => {
    updatePackagePricingByCountry();
  };

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

  const handleSelectInvoice = (invoice: Invoice) => {
    const jobNumber = invoice.jobNumber || JobNumberService.getJobNumberByInvoice(invoice.invoiceNumber);
    
    setFormState(prev => ({
      ...prev,
      invoiceNumber: invoice.invoiceNumber,
      bookingFormNumber: invoice.bookingFormNumber || "",
      airwayBillNumber: invoice.airwayBillNumber || "",
      date: invoice.date || new Date().toISOString().split('T')[0],
      gross: String(invoice.gross || 0),
      discount: String(invoice.discount || 0),
      net: String(invoice.net || 0),
      jobNumber: jobNumber || "",
      remarks: invoice.remarks || ""
    }));
    
    setShowInvoiceSelector(false);
    
    if (!jobNumber && invoice.invoiceNumber && formState.country) {
      const newJobNumber = JobNumberService.generateJobNumber(formState.country);
      
      setFormState(prev => ({
        ...prev,
        jobNumber: newJobNumber
      }));
      
      JobNumberService.linkJobToInvoice(newJobNumber, invoice.invoiceNumber);
    }
  };

  const handleSave = () => {
    try {
      const requiredFields = ['invoiceNumber', 'country', 'destination', 'shipper1', 'consignee1'];
      const missingFields = requiredFields.filter(field => !formState[field as keyof FormState]);
      
      if (missingFields.length > 0) {
        toast.error(`Please fill in required fields: ${missingFields.join(', ')}`);
        return;
      }
      
      if (packageItems.length === 0) {
        toast.error("Please add at least one package");
        return;
      }
      
      let jobNumber = formState.jobNumber;
      if (!jobNumber && formState.country) {
        jobNumber = JobNumberService.generateJobNumber(formState.country);
        
        setFormState(prev => ({
          ...prev,
          jobNumber
        }));
      }
      
      const invoiceId = id || uuidv4();
      
      const invoiceData = {
        id: invoiceId,
        ...formState,
        jobNumber,
        packageDetails: packageItems
      };
      
      let storedInvoices: any[] = [];
      const storedInvoicesString = localStorage.getItem('invoices');
      
      if (storedInvoicesString) {
        storedInvoices = JSON.parse(storedInvoicesString);
      }
      
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
      
      localStorage.setItem('invoices', JSON.stringify(storedInvoices));
      
      toast.success(id ? "Invoice updated successfully" : "Invoice created successfully", {
        description: `Invoice ${formState.invoiceNumber} has been ${id ? 'updated' : 'created'} with Job Number: ${jobNumber}`,
      });
      
      setSavedInvoiceId(invoiceId);
      
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
