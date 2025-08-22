export interface TunisiaCustomer {
  id: string;
  prefix?: "MR." | "MRS." | "MS." | "DR." | "PROF.";
  name: string;
  address: string;
  mobile: string;
  metrashMobile?: string;
  email?: string;
  idNumber?: string;
}

export interface TunisiaInvoice {
  id: string;
  invoiceNumber: string;
  hblNumber?: string;
  customer: TunisiaCustomer;
  vehicle: {
    make: string;
    model: string;
    year: string;
    color: string;
    chassisNumber: string;
    plateNumber: string;
    engineNumber: string;
    country: string;
    hsCode: string;
    exportPlate: string;
    type: "SEDAN" | "SUV" | "HILUX" | "DOUBLE_PICKUP" | "STATION_WAGON" | "SUPER_SALOON" | "SALOON";
    freightCharge: number;
    photos: string[];
  };
  personalEffects?: {
    description: string;
    quantity: number;
    volume: number; // CBM
    charges: number;
    photos: string[];
  }[];
  supportingDocuments?: string[];
  totalAmount: number;
  date: string;
  status: "DRAFT" | "CONFIRMED" | "LOADED";
}

export interface PaymentDetails {
  method: "CASH" | "CARD" | "BANK_TRANSFER" | "CHEQUE";
  transactionId?: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface HouseBillOfLading {
  id: string;
  blNumber: string;
  date: string;
  shipper: {
    name: string;
    address: string;
    phone?: string;
  };
  consignee: {
    name: string;
    address: string;
    idNumber?: string;
  };
  notifyParty?: {
    name: string;
    address: string;
  };
  agent: string;
  carrier: string;
  vessel: string;
  voyage?: string;
  portOfLoading: string;
  portOfDischarge: string;
  finalDestination: string;
  containerNumber: string;
  sealNumber: string;
  cargo: {
    description: string;
    weight: string;
    packages: string;
    marks?: string;
  };
  freightDetails: {
    payable: boolean;
    place: string;
    dateOfIssue: string;
  };
  specialInstructions?: string;
}