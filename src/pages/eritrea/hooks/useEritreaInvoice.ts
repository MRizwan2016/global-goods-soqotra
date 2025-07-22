import { useState, useEffect } from "react";
import { doorToDoorPricing, eritreaPackageTypes, calculateVolumeWeight, calculateCubicFeet } from "../data/eritreaData";
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
  
  // Door to Door
  doorToDoor: "YES" | "NO";
  doorToDoorPrice: number;
  
  // Shipper Details
  shipperName: string;
  shipperAddress: string;
  shipperMobile: string;
  shipperEmail: string;
  shipperIdNumber: string;
  
  // Consignee Details
  consigneeName: string;
  consigneeAddress: string;
  consigneeMobile: string;
  consigneeEmail: string;
  consigneeIdNumber: string;
  
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
    doorToDoor: "NO",
    doorToDoorPrice: 0,
    shipperName: "",
    shipperAddress: "",
    shipperMobile: "",
    shipperEmail: "",
    shipperIdNumber: "",
    consigneeName: "",
    consigneeAddress: "",
    consigneeMobile: "",
    consigneeEmail: "",
    consigneeIdNumber: "",
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
    freightBy: "SEA"
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

  // Auto-calculate door-to-door pricing when sector changes
  useEffect(() => {
    if (formData.doorToDoor === "YES" && formData.sector) {
      const pricing = doorToDoorPricing[formData.sector as keyof typeof doorToDoorPricing];
      if (pricing) {
        setFormData(prev => ({
          ...prev,
          doorToDoorPrice: pricing.price,
          destinationDoorDelivery: pricing.price
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        doorToDoorPrice: 0,
        destinationDoorDelivery: 0
      }));
    }
  }, [formData.doorToDoor, formData.sector]);

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
    try {
      // Validate required fields
      if (!formData.invoiceNumber) {
        toast.error("Invoice number is required");
        return false;
      }
      
      if (!formData.shipperName || !formData.consigneeName) {
        toast.error("Shipper and Consignee names are required");
        return false;
      }

      if (packageItems.length === 0) {
        toast.error("At least one package item is required");
        return false;
      }

      // Save to localStorage for now (can be replaced with API call)
      const invoiceData = {
        ...formData,
        packageItems,
        id: invoiceId || formData.invoiceNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const existingInvoices = JSON.parse(localStorage.getItem("eritrea-invoices") || "[]");
      const invoiceIndex = existingInvoices.findIndex((inv: any) => inv.id === invoiceData.id);
      
      if (invoiceIndex >= 0) {
        existingInvoices[invoiceIndex] = invoiceData;
      } else {
        existingInvoices.push(invoiceData);
      }
      
      localStorage.setItem("eritrea-invoices", JSON.stringify(existingInvoices));
      
      toast.success("Invoice saved successfully");
      return true;
    } catch (error) {
      console.error("Error saving invoice:", error);
      toast.error("Failed to save invoice");
      return false;
    }
  };

  const loadInvoice = async (id: string) => {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem("eritrea-invoices") || "[]");
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
    loadInvoice
  };
};