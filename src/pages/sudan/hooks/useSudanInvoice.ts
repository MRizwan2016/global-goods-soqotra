import { useState, useEffect } from "react";
import { toast } from "sonner";

// Interface for individual package items
export interface SudanPackageItem {
  id: string;
  name: string;
  description?: string;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
  cubicMetre: number;
  cubicFeet: number;
  volumeWeight: number;
  price?: number;
  isSpecialProduct?: boolean;
  sellingAmount?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  volume?: number;
  grossWeight?: number;
  isPending?: boolean;
}

// Main form data interface
export interface SudanFormData {
  // Basic Details
  invoiceNumber: string;
  invoiceDate: string;
  jobNumber: string;
  port: string;
  warehouse: string;
  sector: string;
  salesRep: string;
  driver: string;
  district: string;
  doorToDoor: string;
  remarks: string;
  
  // UPB Integration
  selectedInvoiceNumber: string;
  selectedBookNumber: string;
  isBookActivated: boolean;
  assignedUser: string;

  // Shipper Information
  shipperPrefix: string;
  shipperName: string;
  shipperName1: string;
  shipperName2: string;
  shipperCountry: string;
  shipperCity: string;
  shipperAddress: string;
  shipperMobile: string;
  shipperEmail: string;
  shipperIdNumber: string;
  
  // Consignee Information
  consigneePrefix: string;
  consigneeName: string;
  consigneeName1: string;
  consigneeName2: string;
  consigneeSecondName: string;
  consigneeCountry: string;
  consigneeCity: string;
  consigneeAddress: string;
  consigneeMobile: string;
  consigneeMobile1: string;
  consigneeMobile2: string;
  consigneeSecondMobile: string;
  consigneeEmail: string;
  consigneeIdNumber: string;
  
  // Package Summary
  totalWeight: number;
  totalVolume: number;
  totalCubicFeet: number;
  totalVolumeWeight: number;
  packageCount: number;
  
  // Cost Details
  freight: number;
  doorCharges: number;
  totalFreight: number;
  discount: number;
  netAmount: number;
  paymentStatus: string;
  freightType?: string;
  packingCharges?: number;
  freightStatus?: string;
}

const initialFormData: SudanFormData = {
  // Basic Details
  invoiceNumber: "",
  invoiceDate: new Date().toISOString().split('T')[0],
  jobNumber: "",
  port: "PORT_SUDAN",
  warehouse: "SUDAN",
  sector: "KASSALA",
  salesRep: "",
  driver: "",
  district: "",
  doorToDoor: "NO",
  remarks: "",
  
  // UPB Integration
  selectedInvoiceNumber: "",
  selectedBookNumber: "",
  isBookActivated: false,
  assignedUser: "",

  // Shipper Information
  shipperPrefix: "MR.",
  shipperName: "",
  shipperName1: "",
  shipperName2: "",
  shipperCountry: "QATAR",
  shipperCity: "",
  shipperAddress: "",
  shipperMobile: "",
  shipperEmail: "",
  shipperIdNumber: "",
  
  // Consignee Information
  consigneePrefix: "MR.",
  consigneeName: "",
  consigneeName1: "",
  consigneeName2: "",
  consigneeSecondName: "",
  consigneeCountry: "SUDAN",
  consigneeCity: "",
  consigneeAddress: "",
  consigneeMobile: "",
  consigneeMobile1: "",
  consigneeMobile2: "",
  consigneeSecondMobile: "",
  consigneeEmail: "",
  consigneeIdNumber: "",
  
  // Package Summary
  totalWeight: 0,
  totalVolume: 0,
  totalCubicFeet: 0,
  totalVolumeWeight: 0,
  packageCount: 0,
  
  // Cost Details
  freight: 0,
  doorCharges: 0,
  totalFreight: 0,
  discount: 0,
  netAmount: 0,
  paymentStatus: "UNPAID",
  freightType: "PREPAID",
  packingCharges: 0,
  freightStatus: "UNPAID",
};

export const useSudanInvoice = () => {
  const [formData, setFormData] = useState<SudanFormData>(initialFormData);
  const [packageItems, setPackageItems] = useState<SudanPackageItem[]>([]);

  // Auto-calculate freight based on sector and district
  useEffect(() => {
    if (formData.sector && formData.district) {
      // Sudan specific freight calculation logic
      let baseFreight = 59; // Base freight for Sudan
      
      // Sector-based pricing
      switch (formData.sector) {
        case 'KASSALA':
          baseFreight = 65;
          break;
        case 'KHARTOUM':
          baseFreight = 70;
          break;
        case 'PORT_SUDAN':
          baseFreight = 55;
          break;
        case 'GEDAREF':
          baseFreight = 68;
          break;
        default:
          baseFreight = 59;
      }

      // Door-to-door charges
      const doorCharges = formData.doorToDoor === "YES" ? 15 : 0;
      const totalFreight = baseFreight + doorCharges + (formData.packingCharges || 0);

      setFormData(prev => ({
        ...prev,
        freight: baseFreight,
        doorCharges,
        totalFreight,
        netAmount: totalFreight - prev.discount
      }));
    }
  }, [formData.sector, formData.district, formData.doorToDoor, formData.discount]);

  // Auto-calculate totals when package items change
  useEffect(() => {
    const totalWeight = packageItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
    const totalVolume = packageItems.reduce((sum, item) => sum + (item.cubicMetre * item.quantity), 0);
    const totalCubicFeet = packageItems.reduce((sum, item) => sum + (item.cubicFeet * item.quantity), 0);
    const totalVolumeWeight = packageItems.reduce((sum, item) => sum + (item.volumeWeight * item.quantity), 0);
    const packageCount = packageItems.reduce((sum, item) => sum + item.quantity, 0);

    setFormData(prev => ({
      ...prev,
      totalWeight: parseFloat(totalWeight.toFixed(2)),
      totalVolume: parseFloat(totalVolume.toFixed(3)),
      totalCubicFeet: parseFloat(totalCubicFeet.toFixed(2)),
      totalVolumeWeight: parseFloat(totalVolumeWeight.toFixed(2)),
      packageCount
    }));
  }, [packageItems]);

  // Update country codes when country changes
  useEffect(() => {
    // This would set appropriate country codes
    // For now, we'll keep it simple
  }, [formData.shipperCountry, formData.consigneeCountry]);

  const handleFormChange = (field: keyof SudanFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePackageTypeSelect = (packageType: any) => {
    // Add predefined package type
    const newPackage: SudanPackageItem = {
      id: `package-${Date.now()}`,
      name: packageType.name,
      description: packageType.name,
      length: packageType.length,
      width: packageType.width,
      height: packageType.height,
      weight: 0,
      quantity: 1,
      cubicMetre: packageType.volume,
      cubicFeet: packageType.volume * 35.3147, // Convert m³ to ft³
      volumeWeight: packageType.volume * 167, // Standard calculation
    };
    
    setPackageItems(prev => [...prev, newPackage]);
  };

  const handlePackageInputChange = (packageId: string, field: string, value: any) => {
    setPackageItems(prev => 
      prev.map(item => 
        item.id === packageId 
          ? { ...item, [field]: parseFloat(value) || 0 }
          : item
      )
    );
  };

  const addPackageItem = (packageData: any) => {
    const newPackage: SudanPackageItem = {
      id: `package-${Date.now()}`,
      name: packageData.name || "Package",
      description: packageData.description || packageData.name,
      length: packageData.length || 0,
      width: packageData.width || 0,
      height: packageData.height || 0,
      weight: packageData.weight || 0,
      quantity: packageData.quantity || 1,
      cubicMetre: packageData.cubicMetre || 0,
      cubicFeet: packageData.cubicFeet || 0,
      volumeWeight: packageData.volumeWeight || 0,
      price: packageData.price,
      isSpecialProduct: packageData.isSpecialProduct,
      sellingAmount: packageData.sellingAmount,
      dimensions: packageData.dimensions,
      volume: packageData.volume,
      grossWeight: packageData.grossWeight,
    };
    
    setPackageItems(prev => [...prev, newPackage]);
  };

  const addManualPackageItem = (packageData: any) => {
    addPackageItem(packageData);
  };

  const removePackageItem = (packageId: string) => {
    setPackageItems(prev => prev.filter(item => item.id !== packageId));
  };

  const updatePackageItem = (packageId: string, updatedData: Partial<SudanPackageItem>) => {
    setPackageItems(prev => 
      prev.map(item => 
        item.id === packageId 
          ? { ...item, ...updatedData }
          : item
      )
    );
  };

  const saveInvoice = async (invoiceId?: string) => {
    try {
      const invoiceData = {
        id: invoiceId || `sudan-${Date.now()}`,
        formData,
        packageDetails: packageItems,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const existingInvoices = JSON.parse(localStorage.getItem('sudanInvoices') || '[]');
      
      if (invoiceId) {
        // Update existing
        const index = existingInvoices.findIndex((inv: any) => inv.id === invoiceId);
        if (index !== -1) {
          existingInvoices[index] = invoiceData;
        }
      } else {
        // Add new
        existingInvoices.push(invoiceData);
      }

      localStorage.setItem('sudanInvoices', JSON.stringify(existingInvoices));
      toast.success("Invoice saved successfully");
      
      return invoiceData.id;
    } catch (error) {
      console.error('Save error:', error);
      toast.error("Failed to save invoice");
      throw error;
    }
  };

  const loadInvoice = (invoiceId: string) => {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem('sudanInvoices') || '[]');
      const invoice = existingInvoices.find((inv: any) => inv.id === invoiceId);
      
      if (invoice) {
        setFormData(invoice.formData || initialFormData);
        setPackageItems(invoice.packageDetails || []);
        return invoice;
      }
      
      return null;
    } catch (error) {
      console.error('Load error:', error);
      toast.error("Failed to load invoice");
      return null;
    }
  };

  const activateInvoice = (invoiceId: string) => {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem('sudanInvoices') || '[]');
      const updatedInvoices = existingInvoices.map((inv: any) => 
        inv.id === invoiceId 
          ? { ...inv, isActivated: true, activatedAt: new Date().toISOString() }
          : inv
      );
      
      localStorage.setItem('sudanInvoices', JSON.stringify(updatedInvoices));
      toast.success("Invoice activated successfully");
    } catch (error) {
      console.error('Activation error:', error);
      toast.error("Failed to activate invoice");
    }
  };

  const assignBookNumber = (invoiceId: string, bookNumber: string) => {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem('sudanInvoices') || '[]');
      const updatedInvoices = existingInvoices.map((inv: any) => 
        inv.id === invoiceId 
          ? { ...inv, assignedBookNumber: bookNumber, assignedAt: new Date().toISOString() }
          : inv
      );
      
      localStorage.setItem('sudanInvoices', JSON.stringify(updatedInvoices));
      toast.success("Book number assigned successfully");
    } catch (error) {
      console.error('Assignment error:', error);
      toast.error("Failed to assign book number");
    }
  };

  const getActivatedInvoices = () => {
    try {
      const existingInvoices = JSON.parse(localStorage.getItem('sudanInvoices') || '[]');
      return existingInvoices.filter((inv: any) => inv.isActivated);
    } catch (error) {
      console.error('Get activated invoices error:', error);
      return [];
    }
  };

  return {
    formData,
    packageItems,
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
    getActivatedInvoices,
    setFormData,
    setPackageItems,
  };
};
