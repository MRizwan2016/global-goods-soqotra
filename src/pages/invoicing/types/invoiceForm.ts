
export interface PackageItem {
  id: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
  // Added missing properties referenced in packageCalculations.ts
  volume?: string;
  weight?: string;
  length?: string;
  width?: string;
  height?: string;
  boxNumber?: string;
  volumeWeight?: string;
  documentsFee?: string;
  name?: string; // For compatibility with older code
}

export interface FormState {
  [key: string]: any;
  
  invoiceNumber: string;
  bookingFormNumber?: string;
  airwayBillNumber?: string;
  date: string;
  destination?: string;
  salesAgent?: string;
  remarks?: string;
  
  jobNumber?: string; // Ensure this is consistently defined
  
  shipper1: string;
  shipperMobile?: string;
  shipperEmail?: string;
  shipperCity?: string;
  
  consignee1: string;
  consigneeMobile?: string;
  consigneeEmail?: string;
  consigneeCity?: string;
  
  packagesName?: string;
  length?: string;
  width?: string;
  height?: string;
  cubicMetre?: string;
  packageWeight?: string;
  boxNumber?: string;
  price?: string;
  documentsFee?: string;
  total?: string;
  
  paymentMethod?: string;
  paymentStatus?: string;
  paymentDate?: string;
  bankingDate?: string;
  
  gross: string;
  discount: string;
  net: string;
  
  country: string;
  sector: string;
  branch: string;
  warehouse: string;
  district?: string;
  
  packages?: string;
  weight?: string;
  volume?: string;
  doorToDoor?: string;
  freightBy?: string;
  invoiceDate?: string;

  salesRep?: string;
  driver?: string;
  catZone?: string;
  giftCargo?: string;
  prePaid?: string;
  selectedPackage?: any; // Changed from string to any to support both string and object
  cubicFeet?: string;
  volumeWeight?: string;
  handOverBy?: string;
  shipper2?: string;
  shipperIdNumber?: string;
  collectionAddress?: string;
  consignee2?: string;
  address?: string;
  consigneeLandline?: string;
  consigneeIdNumber?: string;
  freight?: string;
  destinationTransport?: string;
  document?: string;
  localTransport?: string;
  packing?: string;
  storage?: string;
  destinationClearing?: string;
  destinationDoorDelivery?: string;
  other?: string;
  agentName?: string;
  agentNumber?: string;
  subZone?: string;
  currency?: string;
}

export interface Invoice {
  id?: string;
  invoiceNumber: string;
  bookingFormNumber?: string;
  bookingForm?: string;
  bookNumber?: string;
  gross?: number;
  discount?: number;
  net?: number;
  date?: string;
  grossAmount?: number;
  netAmount?: number;
  totalPaid?: number;
  balanceToPay?: number;
  shipper?: string;
  shipper1?: string;
  consignee?: string;
  consignee1?: string;
  freightType?: string;
  shipmentType?: string;
  warehouse?: string;
  jobNumber?: string; // Ensure job number is consistently defined
  currency?: string;
  country?: string;
  remarks?: string;
  amount?: number;
  paid?: boolean;
  airwayBillNumber?: string; // Added this to fix error in useInvoiceForm.ts
}
