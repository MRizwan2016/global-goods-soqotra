
import { mockInvoiceData } from "@/data/mockData";
import { FormState, PackageItem } from "../types/invoiceForm";

/**
 * Find an existing invoice by ID
 */
export const findExistingInvoice = (id?: string) => {
  if (!id) return null;
  return mockInvoiceData.find(inv => inv.id === id);
};

/**
 * Initialize form state with existing invoice data or defaults
 */
export const initializeFormState = (existingInvoice: any): FormState => {
  return {
    sector: existingInvoice?.sector || "COLOMBO : C",
    branch: existingInvoice?.branch || "DOHA : HOF",
    warehouse: existingInvoice?.warehouse || "Colombo : C",
    salesRep: existingInvoice?.salesAgent || "",
    doorToDoor: existingInvoice?.doorToDoor ? "YES" : "NO",
    driver: existingInvoice?.driver || "",
    district: existingInvoice?.district || "COLOMBO : C - C",
    volume: existingInvoice?.volume?.toString() || "0",
    catZone: existingInvoice?.catZone || "Normal Rate : 0",
    weight: existingInvoice?.weight?.toString() || "0",
    freightBy: existingInvoice?.freightBy || "SEA",
    packages: existingInvoice?.packages?.toString() || "0",
    invoiceNumber: existingInvoice?.invoiceNumber || "",
    remarks: existingInvoice?.remarks || "",
    invoiceDate: existingInvoice?.date || "",
    giftCargo: "NO",
    prePaid: "NO",
    country: existingInvoice?.country || "Sri Lanka",
    destination: existingInvoice?.destination || "Kenya", // Add default destination
    
    // Package details
    packagesName: "",
    selectedPackage: null,
    length: "",
    width: "",
    height: "",
    cubicMetre: "",
    cubicFeet: "",
    packageWeight: "0",
    boxNumber: "0",
    volumeWeight: "0",
    price: "0",
    documentsFee: "0",
    total: "0",
    
    // Shipping details
    handOverBy: existingInvoice?.handOverBy || "",
    shipper1: existingInvoice?.shipper1 || "",
    shipper2: existingInvoice?.shipper2 || "",
    shipperMobile: existingInvoice?.shipperMobile || "",
    shipperIdNumber: existingInvoice?.shipperIdNumber || "",
    collectionAddress: existingInvoice?.collectionAddress || "",
    shipperCity: existingInvoice?.shipperCity || "",
    
    consignee1: existingInvoice?.consignee1 || "",
    consignee2: existingInvoice?.consignee2 || "",
    address: existingInvoice?.address || "",
    consigneeCity: existingInvoice?.consigneeCity || "",
    consigneeMobile: existingInvoice?.consigneeMobile || "",
    consigneeLandline: existingInvoice?.consigneeLandline || "",
    consigneeIdNumber: existingInvoice?.consigneeIdNumber || "",
    
    // Payment details
    freight: existingInvoice?.gross?.toString() || "0",
    destinationTransport: "0",
    document: "0",
    localTransport: "0",
    packing: "0",
    storage: "0",
    destinationClearing: "0",
    destinationDoorDelivery: "0",
    other: "0",
    gross: existingInvoice?.gross?.toString() || "0",
    discount: existingInvoice?.discount?.toString() || "0",
    net: existingInvoice?.net?.toString() || "0",
    agentName: "",
    agentNumber: "0",
    subZone: "1 : Colombo",
    paymentMethod: "",
    paymentStatus: "",
    paymentDate: "",
    bankingDate: "",
  };
};

/**
 * Initialize package items from existing invoice data
 */
export const initializePackageItems = (existingInvoice: any): PackageItem[] => {
  if (existingInvoice?.packageDetails) {
    return existingInvoice.packageDetails as PackageItem[];
  }
  return [];
};
