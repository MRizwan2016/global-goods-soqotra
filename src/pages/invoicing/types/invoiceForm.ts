
export interface PackageItem {
  id: string;
  name: string;
  length: string;
  width: string;
  height: string;
  volume: string;
  weight: string;
  boxNumber: string;
  volumeWeight: string;
  price: string;
  documentsFee: string;
  total: string;
}

export interface FormState {
  sector: string;
  branch: string;
  warehouse: string;
  salesRep: string;
  doorToDoor: string;
  driver: string;
  district: string;
  volume: string;
  catZone: string;
  weight: string;
  freightBy: string;
  packages: string;
  invoiceNumber: string;
  remarks: string;
  invoiceDate: string;
  giftCargo: string;
  prePaid: string;
  country: string;
  destination: string; // Added destination country
  
  // Package details
  packagesName: string;
  selectedPackage: any | null;
  length: string;
  width: string;
  height: string;
  cubicMetre: string;
  cubicFeet: string;
  packageWeight: string;
  boxNumber: string;
  volumeWeight: string;
  price: string;
  documentsFee: string;
  total: string;
  
  // Shipping details
  handOverBy: string;
  shipper1: string;
  shipper2: string;
  shipperMobile: string;
  shipperIdNumber: string;
  collectionAddress: string;
  shipperCity: string;
  
  consignee1: string;
  consignee2: string;
  address: string;
  consigneeCity: string;
  consigneeMobile: string;
  consigneeLandline: string;
  consigneeIdNumber: string;
  
  // Payment details
  freight: string;
  destinationTransport: string;
  document: string;
  localTransport: string;
  packing: string;
  storage: string;
  destinationClearing: string;
  destinationDoorDelivery: string;
  other: string;
  gross: string;
  discount: string;
  net: string;
  agentName: string;
  agentNumber: string;
  subZone: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentDate: string;
  bankingDate: string;
}

export interface InvoiceFormReturnType {
  formState: FormState;
  packageItems: PackageItem[];
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: (show: boolean) => void;
  availableInvoices: any[];
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handlePackageSelect: (description: string) => void;
  handleManualPackage: (packageName: string, price: string) => void;
  handleAddPackage: () => void;
  handleRemovePackage: (id: string) => void;
  handleSelectInvoice: (invoiceNumber: string) => void;
  handleSave: () => void;
  countrySectorMap: typeof import('../constants/countrySectorMap').countrySectorMap;
}
