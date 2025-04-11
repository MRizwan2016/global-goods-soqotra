
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

  // Load available invoice numbers
  useEffect(() => {
    if (!isEditing) {
      try {
        // Get active invoice books from localStorage
        const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
        const allStoredBooks = JSON.parse(localStorage.getItem('invoiceBooks') || '[]');
        
        // Get used invoice numbers to filter them out
        const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        const usedInvoiceNumbers = existingInvoices.map((inv: any) => inv.invoiceNumber);
        
        // Also check generated invoices if they exist
        const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
        const generatedInvoiceNumbers = generatedInvoices.map((inv: any) => inv.invoiceNumber);
        
        // Combine all used numbers
        const allUsedNumbers = [...usedInvoiceNumbers, ...generatedInvoiceNumbers];
        
        let invoiceList: any[] = [];
        
        if (activeBooks.length > 0) {
          // Use active books from localStorage
          activeBooks.forEach((book: any) => {
            if (book.availablePages) {
              // Filter out already used invoice numbers
              const availablePages = book.availablePages.filter(
                (page: string) => !allUsedNumbers.includes(page)
              );
              
              invoiceList = [
                ...invoiceList,
                ...availablePages.map((pageNumber: string) => ({
                  bookNumber: book.bookNumber,
                  invoiceNumber: pageNumber,
                  assignedTo: book.assignedTo || 'Unassigned'
                }))
              ];
            }
          });
        } 
        
        if (invoiceList.length === 0 && allStoredBooks.length > 0) {
          // If no active books but we have stored books
          allStoredBooks
            .filter((book: any) => book.isActivated)
            .forEach((book: any) => {
              if (book.availablePages) {
                // Filter out already used invoice numbers
                const availablePages = book.availablePages.filter(
                  (page: string) => !allUsedNumbers.includes(page)
                );
                
                invoiceList = [
                  ...invoiceList,
                  ...availablePages.map((pageNumber: string) => ({
                    bookNumber: book.bookNumber,
                    invoiceNumber: pageNumber,
                    assignedTo: book.assignedTo || 'System User'
                  }))
                ];
              }
            });
        }
        
        if (invoiceList.length === 0) {
          // Create mock invoice books if none found
          // Generate GY-prefixed invoice numbers
          const mockInvoices = [];
          for (let i = 1; i <= 100; i++) {
            const num = i.toString().padStart(6, '0');
            mockInvoices.push(`GY${num}`);
          }
          
          // Filter out used invoice numbers
          const availableMockInvoices = mockInvoices
            .filter(invoiceNo => !allUsedNumbers.includes(invoiceNo))
            .map(invoiceNo => ({
              invoiceNumber: invoiceNo,
              bookNumber: "Default",
              assignedTo: 'System User'
            }));
          
          invoiceList = availableMockInvoices;
        }
        
        console.log("Available invoices in form:", invoiceList);
        setAvailableInvoices(invoiceList);
      } catch (error) {
        console.error("Error loading available invoices:", error);
      }
    }
  }, [isEditing]);

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

  const handleSelectInvoice = (invoiceNumber: string) => {
    console.log("Setting invoice number:", invoiceNumber);
    
    const jobNumber = JobNumberService.getJobNumberByInvoice(invoiceNumber);
    
    setFormState(prev => ({
      ...prev,
      invoiceNumber: invoiceNumber,
      jobNumber: jobNumber || ""
    }));
    
    setShowInvoiceSelector(false);
    
    if (!jobNumber && invoiceNumber && formState.country) {
      const newJobNumber = JobNumberService.generateJobNumber(formState.country);
      
      setFormState(prev => ({
        ...prev,
        jobNumber: newJobNumber
      }));
      
      JobNumberService.linkJobToInvoice(newJobNumber, invoiceNumber);
    }
    
    toast.success(`Invoice number ${invoiceNumber} selected`);
  };

  const handleSave = () => {
    try {
      console.log("Saving form with state:", formState);
      
      if (!formState.invoiceNumber) {
        toast.error("Please select an invoice number");
        return;
      }
      
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
      
      // Check for duplicate invoice number if creating a new invoice
      if (!isEditing) {
        const isDuplicate = storedInvoices.some((invoice: any) => 
          invoice.invoiceNumber === formState.invoiceNumber
        );
        
        if (isDuplicate) {
          toast.error(`Invoice number ${formState.invoiceNumber} is already assigned to another customer`);
          return;
        }
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
