import { useState, useEffect } from "react";
import { doorToDoorPricing, eritreaPackageTypes, calculateVolumeWeight, calculateCubicFeet, countryCodes, sectorCitiesMapping, eritreaSectorPricing } from "../data/eritreaData";
import { toast } from "sonner";

export interface EritreaPackageItem {
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

export interface EritreaFormData {
  // Basic Details
  invoiceNumber: string;
  invoiceDate: string;
  port: string;
  sector: string;
  salesRep: string;
  driver: string;
  district: string;
  jobNumber: string;
  jobDate: string;
  
  // Invoice Book Details
  bookNumber: string;
  isInvoiceActivated: boolean;
  
  // Door to Door
  doorToDoor: "YES" | "NO";
  doorToDoorPrice: number;
  
  // Shipper Details
  shipperPrefix: string;
  shipperName: string;
  shipperName2: string;
  shipperCity: string;
  shipperAddress: string;
  shipperMobile: string;
  shipperEmail: string;
  shipperIdNumber: string;
  shipperCountry: string;
  
  // Consignee Details
  consigneePrefix: string;
  consigneeName: string;
  consigneeName2: string;
  consigneeCity: string;
  consigneeAddress: string;
  consigneeMobile: string;
  consigneeMobile2: string;
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

export const useEritreaInvoice = (invoiceId?: string) => {
  const [formData, setFormData] = useState<EritreaFormData>({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    port: "",
    sector: "",
    salesRep: "",
    driver: "",
    district: "",
    jobNumber: "",
    jobDate: new Date().toISOString().split('T')[0],
    bookNumber: "",
    isInvoiceActivated: false,
    doorToDoor: "NO",
    doorToDoorPrice: 0,
    shipperPrefix: "",
    shipperName: "",
    shipperName2: "",
    shipperCity: "",
    shipperAddress: "",
    shipperMobile: "",
    shipperEmail: "",
    shipperIdNumber: "",
    shipperCountry: "QATAR",
    consigneePrefix: "",
    consigneeName: "",
    consigneeName2: "",
    consigneeCity: "",
    consigneeAddress: "",
    consigneeMobile: "",
    consigneeMobile2: "",
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

  const [packageItems, setPackageItems] = useState<EritreaPackageItem[]>([]);
  const [selectedPackageType, setSelectedPackageType] = useState("");
  const [packageInput, setPackageInput] = useState({
    name: "",
    length: "",
    width: "",
    height: "",
    weight: "",
    quantity: "1"
  });

  // Auto-calculate freight based on sector, district, and total weight
  useEffect(() => {
    if (formData.sector && formData.district && formData.totalWeight > 0) {
      // Get pricing for the specific city/district
      const sectorPricing = eritreaSectorPricing[formData.sector as keyof typeof eritreaSectorPricing];
      
      if (sectorPricing && 'cities' in sectorPricing) {
        const cityPricing = (sectorPricing as any).cities[formData.district];
        
        if (cityPricing) {
          // Base price calculation: Total Weight × Freight per KG
          const baseFreight = formData.totalWeight * cityPricing.freightPerKg;
          
          // Door-to-door calculation: if enabled and available, add door charge × total weight
          let doorToDoorAmount = 0;
          if (formData.doorToDoor === "YES" && cityPricing.doorToDoor?.available) {
            doorToDoorAmount = formData.totalWeight * cityPricing.doorToDoor.charge;
          }
          
          setFormData(prev => ({
            ...prev,
            freight: baseFreight,
            doorToDoorPrice: doorToDoorAmount,
            destinationDoorDelivery: doorToDoorAmount
          }));
        }
      }
    } else if (formData.doorToDoor === "NO") {
      setFormData(prev => ({
        ...prev,
        doorToDoorPrice: 0,
        destinationDoorDelivery: 0
      }));
    }
  }, [formData.doorToDoor, formData.sector, formData.district, formData.totalWeight]);

  // Auto-update district/province when sector changes
  useEffect(() => {
    if (formData.sector) {
      const availableCities = sectorCitiesMapping[formData.sector as keyof typeof sectorCitiesMapping];
      if (availableCities && availableCities.length > 0) {
        // If current district is not in the new sector's cities, reset it
        if (!availableCities.includes(formData.district)) {
          setFormData(prev => ({
            ...prev,
            district: "" // Reset district when sector changes
          }));
        }
      }
    }
  }, [formData.sector]);

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

  const handleFormChange = (field: keyof EritreaFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePackageTypeSelect = (packageType: string) => {
    const selectedType = eritreaPackageTypes.find(pkg => pkg.name === packageType);
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
        !packageInput.height || !packageInput.quantity) {
      toast.error("Please fill package name, dimensions, and quantity");
      return;
    }

    const length = parseFloat(packageInput.length);
    const width = parseFloat(packageInput.width);
    const height = parseFloat(packageInput.height);
    let weight = parseFloat(packageInput.weight) || 0;
    const quantity = parseInt(packageInput.quantity);

    const cubicMetre = (length * width * height) / 1000000; // Convert cm³ to m³
    const cubicFeet = calculateCubicFeet(cubicMetre);
    const volumeWeight = calculateVolumeWeight(length, width, height);

    // Auto-calculate weight if not provided - use volume weight if greater than actual weight
    if (!packageInput.weight || weight === 0) {
      weight = volumeWeight;
      toast.info(`Auto-calculated weight: ${weight.toFixed(2)} kg based on volume`);
    } else if (volumeWeight > weight) {
      // Use the greater of actual weight and volume weight (chargeable weight)
      weight = volumeWeight;
      toast.info(`Using volume weight: ${weight.toFixed(2)} kg (greater than actual weight)`);
    }

    const newPackageItem: EritreaPackageItem = {
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

  const addManualPackageItem = (packageData: {
    name: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    quantity: number;
    cubicMetre: number;
    cubicFeet: number;
    volumeWeight: number;
  }) => {
    const newPackageItem: EritreaPackageItem = {
      id: Date.now().toString(),
      ...packageData
    };

    setPackageItems(prev => [...prev, newPackageItem]);
    toast.success("Manual package added successfully");
  };

  const removePackageItem = (id: string) => {
    setPackageItems(prev => prev.filter(item => item.id !== id));
    toast.success("Package removed");
  };

  const updatePackageItem = (id: string, updates: Partial<EritreaPackageItem>) => {
    setPackageItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const saveInvoice = async () => {
    console.log("💾 ERITREA INVOICE SAVE - Starting save process");
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
        country: 'eritrea',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      console.log("📝 Prepared invoice data:", invoiceData);

      // Use consistent localStorage key
      const storageKey = "eritreaInvoices";
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
        console.log("✅ ERITREA INVOICE - Save verified successfully!");
        console.log("Saved invoice:", savedInvoice);
        toast.success("Eritrea invoice saved successfully!");
        return true;
      } else {
        console.log("❌ ERITREA INVOICE - Save verification failed");
        toast.error("Failed to verify invoice save");
        return false;
      }
      
    } catch (error) {
      console.error("❌ ERITREA INVOICE SAVE ERROR:", error);
      toast.error("Failed to save Eritrea invoice");
      return false;
    }
  };

  const loadInvoice = async (id: string) => {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem("eritreaInvoices") || "[]");
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
      const activatedInvoices = JSON.parse(localStorage.getItem("activated-eritrea-invoices") || "[]");
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

      localStorage.setItem("activated-eritrea-invoices", JSON.stringify(activatedInvoices));
      
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
      return JSON.parse(localStorage.getItem("activated-eritrea-invoices") || "[]");
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
    addManualPackageItem,
    removePackageItem,
    updatePackageItem,
    saveInvoice,
    loadInvoice,
    activateInvoice,
    assignBookNumber,
    getActivatedInvoices
  };
};