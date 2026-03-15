import { useState, useEffect } from "react";
import { doorToDoorPricing, saudiArabiaPackageTypes, calculateVolumeWeight, calculateCubicFeet, countryCodes } from "../data/saudiArabiaData";
import { toast } from "sonner";

export interface SaudiArabiaPackageItem {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  cubicMetre: number;
  cubicFeet: number;
  volumeWeight: number;
}

export interface SaudiArabiaFormData {
  // Basic Details
  invoiceNumber: string;
  invoiceDate: string;
  jobNumber: string;
  port: string;
  sector: string;
  salesRep: string;
  driver: string;
  district: string;
  
  // Invoice Book Details
  bookNumber: string;
  isInvoiceActivated: boolean;
  
  // Door to Door
  doorToDoor: "YES" | "NO";
  doorToDoorPrice: number;
  
  // Shipper Details
  shipperPrefix: string;
  shipperName: string;
  shipperCity: string;
  shipperAddress: string;
  shipperMobile: string;
  shipperEmail: string;
  shipperIdNumber: string;
  shipperCountry: string;
  
  // Consignee Details
  consigneePrefix: string;
  consigneeName: string;
  consigneeCity: string;
  consigneeAddress: string;
  consigneeMobile: string;
  consigneeEmail: string;
  consigneeIdNumber: string;
  consigneeCountry: string;
  
  // Package Summary
  totalPackages: number;
  totalWeight: number;
  totalVolume: number;
  
  // Costs
  freight: number;
  documentsFee: number;
  localTransport: number;
  destinationTransport: number;
  packing: number;
  storage: number;
  destinationClearing: number;
  destinationDoorDelivery: number;
  other: number;
  gross: number;
  discount: number;
  net: number;
  
  // Additional
  remarks: string;
  giftCargo: "YES" | "NO";
  prePaid: "YES" | "NO";
  freightBy: "SEA" | "AIR" | "LAND";
  
  // Payment Status
  paymentStatus: "PAID" | "UNPAID";
}

export const useSaudiArabiaInvoice = (invoiceId?: string) => {
  const [formData, setFormData] = useState<SaudiArabiaFormData>({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    jobNumber: "",
    port: "",
    sector: "",
    salesRep: "",
    driver: "",
    district: "",
    bookNumber: "",
    isInvoiceActivated: false,
    doorToDoor: "NO",
    doorToDoorPrice: 0,
    shipperPrefix: "",
    shipperName: "",
    shipperCity: "",
    shipperAddress: "",
    shipperMobile: "",
    shipperEmail: "",
    shipperIdNumber: "",
    shipperCountry: "QATAR",
    consigneePrefix: "",
    consigneeName: "",
    consigneeCity: "",
    consigneeAddress: "",
    consigneeMobile: "",
    consigneeEmail: "",
    consigneeIdNumber: "",
    consigneeCountry: "",
    totalPackages: 0,
    totalWeight: 0,
    totalVolume: 0,
    freight: 0,
    documentsFee: 0,
    localTransport: 0,
    destinationTransport: 0,
    packing: 0,
    storage: 0,
    destinationClearing: 0,
    destinationDoorDelivery: 0,
    other: 0,
    gross: 0,
    discount: 0,
    net: 0,
    remarks: "",
    giftCargo: "NO",
    prePaid: "NO",
    freightBy: "SEA",
    paymentStatus: "UNPAID"
  });

  const [packageItems, setPackageItems] = useState<SaudiArabiaPackageItem[]>([]);
  const [selectedPackageType, setSelectedPackageType] = useState("");
  const [packageInput, setPackageInput] = useState({
    name: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    quantity: "1"
  });

  // Auto-calculate door-to-door pricing based on Gross Weight × Door-to-Door
  useEffect(() => {
    if (formData.doorToDoor === "YES" && formData.sector && formData.totalWeight > 0) {
      const pricing = doorToDoorPricing[formData.sector as keyof typeof doorToDoorPricing];
      if (pricing) {
        // Calculate: Gross Weight × Door-to-Door rate
        const doorToDoorAmount = formData.totalWeight * pricing.price;
        setFormData(prev => ({
          ...prev,
          doorToDoorPrice: doorToDoorAmount,
          destinationDoorDelivery: doorToDoorAmount
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        doorToDoorPrice: 0,
        destinationDoorDelivery: 0
      }));
    }
  }, [formData.doorToDoor, formData.sector, formData.totalWeight]);

  // Auto-calculate totals when costs change
  useEffect(() => {
    const gross = formData.freight + formData.documentsFee + formData.localTransport + 
                  formData.destinationTransport + formData.packing + formData.storage + 
                  formData.destinationClearing + formData.destinationDoorDelivery + formData.other;
    
    const net = gross - formData.discount;
    
    setFormData(prev => ({
      ...prev,
      gross,
      net
    }));
  }, [
    formData.freight, formData.documentsFee, formData.localTransport,
    formData.destinationTransport, formData.packing, formData.storage,
    formData.destinationClearing, formData.destinationDoorDelivery,
    formData.other, formData.discount
  ]);

  // Auto-calculate package totals
  useEffect(() => {
    const totalPackages = packageItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalWeight = packageItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    const totalVolume = packageItems.reduce((sum, item) => sum + (item.cubicMetre * item.quantity), 0);

    setFormData(prev => ({
      ...prev,
      totalPackages,
      totalWeight,
      totalVolume
    }));
  }, [packageItems]);

  // Auto-update mobile number country code when country changes
  useEffect(() => {
    if (formData.shipperCountry && countryCodes[formData.shipperCountry as keyof typeof countryCodes]) {
      const countryCode = countryCodes[formData.shipperCountry as keyof typeof countryCodes];
      if (formData.shipperMobile && !formData.shipperMobile.startsWith(countryCode)) {
        // Remove any existing country code and add the new one
        const cleanNumber = formData.shipperMobile.replace(/^\+\d{1,4}\s?/, '');
        setFormData(prev => ({
          ...prev,
          shipperMobile: `${countryCode} ${cleanNumber}`
        }));
      }
    }
  }, [formData.shipperCountry]);

  useEffect(() => {
    if (formData.consigneeCountry && countryCodes[formData.consigneeCountry as keyof typeof countryCodes]) {
      const countryCode = countryCodes[formData.consigneeCountry as keyof typeof countryCodes];
      if (formData.consigneeMobile && !formData.consigneeMobile.startsWith(countryCode)) {
        // Remove any existing country code and add the new one
        const cleanNumber = formData.consigneeMobile.replace(/^\+\d{1,4}\s?/, '');
        setFormData(prev => ({
          ...prev,
          consigneeMobile: `${countryCode} ${cleanNumber}`
        }));
      }
    }
  }, [formData.consigneeCountry]);

  const handleFormChange = (field: keyof SaudiArabiaFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePackageTypeSelect = (packageType: string) => {
    const selectedType = saudiArabiaPackageTypes.find(pkg => pkg.name === packageType);
    if (selectedType) {
      setPackageInput({
        name: selectedType.name,
        length: selectedType.dimensions.length.toString(),
        width: selectedType.dimensions.width.toString(),
        height: selectedType.dimensions.height.toString(),
        weight: "",
        quantity: "1"
      });
      setSelectedPackageType(packageType);
    }
  };

  const handlePackageInputChange = (field: string, value: string) => {
    setPackageInput(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addPackageItem = () => {
    if (!packageInput.name || !packageInput.length || !packageInput.width || 
        !packageInput.height || !packageInput.weight || !packageInput.quantity) {
      toast.error("Please fill all package details");
      return;
    }

    const length = parseFloat(packageInput.length);
    const width = parseFloat(packageInput.width);
    const height = parseFloat(packageInput.height);
    const weight = parseFloat(packageInput.weight);
    const quantity = parseInt(packageInput.quantity);

    const cubicMetre = (length * width * height) / 1000000; // Convert cm³ to m³
    const cubicFeet = calculateCubicFeet(cubicMetre);
    const volumeWeight = calculateVolumeWeight(length, width, height);

    const newPackageItem: SaudiArabiaPackageItem = {
      id: Date.now().toString(),
      name: packageInput.name,
      length,
      width,
      height,
      weight,
      quantity,
      cubicMetre,
      cubicFeet,
      volumeWeight
    };

    setPackageItems(prev => [...prev, newPackageItem]);
    
    // Reset form
    setPackageInput({
      name: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      quantity: "1"
    });
    setSelectedPackageType("");
    
    toast.success("Package added successfully");
  };

  const removePackageItem = (id: string) => {
    setPackageItems(prev => prev.filter(item => item.id !== id));
    toast.success("Package removed");
  };

  const updatePackageItem = (id: string, updates: Partial<SaudiArabiaPackageItem>) => {
    setPackageItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const saveInvoice = async () => {
    console.log("💾 SAUDI ARABIA INVOICE SAVE - Starting save process");
    console.log("📊 Form data:", formData);
    console.log("📦 Package items:", packageItems);
    
    try {
      // Validate required fields
      if (!formData.invoiceNumber) {
        console.log("❌ VALIDATION FAILED: No invoice number");
        toast.error("Invoice number is required");
        return false;
      }
      
      if (!formData.shipperName || !formData.consigneeName) {
        console.log("❌ VALIDATION FAILED: Missing shipper or consignee name");
        console.log("Shipper:", formData.shipperName, "Consignee:", formData.consigneeName);
        toast.error("Shipper and Consignee names are required");
        return false;
      }

      if (packageItems.length === 0) {
        console.log("❌ VALIDATION FAILED: No package items");
        toast.error("At least one package item is required");
        return false;
      }

      console.log("✅ VALIDATION PASSED - Proceeding with save");

      // Save to localStorage for now (can be replaced with API call)
      const invoiceData = {
        ...formData,
        packageItems,
        id: invoiceId || formData.invoiceNumber,
        country: 'saudi-arabia',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log("📝 Prepared invoice data:", invoiceData);

      // Use consistent localStorage key
      const storageKey = "saudiArabiaInvoices";
      const existingInvoices = JSON.parse(localStorage.getItem(storageKey) || "[]");
      console.log("📚 Current invoices count:", existingInvoices.length);
      
      const invoiceIndex = existingInvoices.findIndex((inv: any) => inv.id === invoiceData.id);
      console.log("🔍 Invoice index check:", invoiceIndex);
      
      if (invoiceIndex >= 0) {
        console.log("📝 Updating existing invoice");
        existingInvoices[invoiceIndex] = invoiceData;
      } else {
        console.log("➕ Adding new invoice");
        existingInvoices.push(invoiceData);
      }
      
      console.log("💾 Saving to localStorage - total invoices:", existingInvoices.length);
      localStorage.setItem(storageKey, JSON.stringify(existingInvoices));
      
      // Verify the save was successful
      const verifyInvoices = JSON.parse(localStorage.getItem(storageKey) || "[]");
      const savedInvoice = verifyInvoices.find((inv: any) => inv.id === invoiceData.id);
      
      if (savedInvoice) {
        console.log("✅ SAUDI ARABIA INVOICE - Save verified successfully!");
        console.log("Saved invoice:", savedInvoice);
        toast.success("Saudi Arabia invoice saved successfully!");
        return true;
      } else {
        console.log("❌ SAUDI ARABIA INVOICE - Save verification failed");
        toast.error("Failed to verify invoice save");
        return false;
      }
      
    } catch (error) {
      console.error("❌ SAUDI ARABIA INVOICE SAVE ERROR:", error);
      toast.error("Failed to save Saudi Arabia invoice");
      return false;
    }
  };

  const loadInvoice = async (id: string) => {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem("saudiArabiaInvoices") || "[]");
      const invoice = existingInvoices.find((inv: any) => inv.id === id);
      
      if (invoice) {
        setFormData(invoice);
        setPackageItems(invoice.packageItems || []);
        return true;
      }
      
      toast.error("Invoice not found");
      return false;
    } catch (error) {
      console.error("Error loading invoice:", error);
      toast.error("Failed to load invoice");
      return false;
    }
  };

  const activateInvoice = (invoiceNumber: string, bookNumber: string) => {
    try {
      // Update form data with activation
      setFormData(prev => ({
        ...prev,
        invoiceNumber,
        bookNumber,
        isInvoiceActivated: true
      }));

      // Store activated invoice in localStorage
      const activatedInvoices = JSON.parse(localStorage.getItem("activated-saudi-arabia-invoices") || "[]");
      const activatedInvoice = {
        invoiceNumber,
        bookNumber,
        activatedAt: new Date().toISOString(),
        status: "ACTIVE"
      };

      const existingIndex = activatedInvoices.findIndex((inv: any) => inv.invoiceNumber === invoiceNumber);
      if (existingIndex >= 0) {
        activatedInvoices[existingIndex] = activatedInvoice;
      } else {
        activatedInvoices.push(activatedInvoice);
      }

      localStorage.setItem("activated-saudi-arabia-invoices", JSON.stringify(activatedInvoices));
      
      toast.success(`Invoice ${invoiceNumber} activated with Book #${bookNumber}`);
      return true;
    } catch (error) {
      console.error("Error activating invoice:", error);
      toast.error("Failed to activate invoice");
      return false;
    }
  };

  const assignBookNumber = (bookNumber: string) => {
    if (!formData.invoiceNumber) {
      toast.error("Please select an invoice first");
      return false;
    }

    return activateInvoice(formData.invoiceNumber, bookNumber);
  };

  const getActivatedInvoices = () => {
    try {
      return JSON.parse(localStorage.getItem("activated-saudi-arabia-invoices") || "[]");
    } catch (error) {
      console.error("Error loading activated invoices:", error);
      return [];
    }
  };

  return {
    formData,
    packageItems,
    selectedPackageType,
    packageInput,
    handleFormChange,
    handlePackageTypeSelect,
    handlePackageInputChange,
    addPackageItem,
    removePackageItem,
    updatePackageItem,
    saveInvoice,
    loadInvoice,
    activateInvoice,
    assignBookNumber,
    getActivatedInvoices
  };
};