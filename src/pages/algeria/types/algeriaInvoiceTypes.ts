export interface AlgeriaCustomer {
  id: string;
  prefix: "MR." | "MRS." | "MS." | "DR." | "PROF.";
  name: string;
  address: string;
  mobile: string;
  metrashMobile?: string;
  email?: string;
  idNumber?: string;
}

export interface AlgeriaInvoice {
  id: string;
  invoiceNumber: string;
  hblNumber?: string;
  customer: AlgeriaCustomer;
  vehicle?: {
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
    type: "SEDAN" | "SUV" | "HILUX" | "DOUBLE_PICKUP";
    freightCharge: number;
    photos: string[];
  };
  personalEffects?: Array<{
    itemCategory: string;
    description: string;
    ownerName: string;
    loadingLocation: "INSIDE_CAR" | "OUTSIDE_CAR";
    quantity: number;
    volume: number;
    weight: number;
    hsCode: string;
    charges: number;
    requiresHBL: boolean;
    photos: string[];
  }>;
  supportingDocuments?: string[];
  totalAmount: number;
  date: string;
  status: "DRAFT" | "PENDING" | "PAID" | "CANCELLED";
  paymentStatus?: "paid" | "unpaid";
  paymentDetails?: PaymentDetails;
}

export interface PaymentDetails {
  method: "CASH" | "CARD" | "BANK_TRANSFER" | "CHEQUE";
  transactionId?: string;
  amount: number;
  date: string;
  notes?: string;
}

export interface HouseBillOfLading {
  blNumber: string;
  blDate: string;
  shipper: {
    name: string;
    address: string;
    phone: string;
    email?: string;
  };
  consignee: {
    name: string;
    address: string;
    phone: string;
    idNumber?: string;
  };
  notifyParty: {
    name: string;
    address: string;
    phone: string;
  };
  agent: {
    name: string;
    address: string;
    phone: string;
  };
  carrier: string;
  vesselName: string;
  voyageNumber: string;
  portOfLoading: string;
  portOfDischarge: string;
  placeOfDelivery: string;
  containerNumber: string;
  sealNumber: string;
  numberOfPackages: number;
  descriptionOfGoods: string;
  grossWeight: string;
  measurement: string;
  freightPayable: string;
  freightPaymentType: "PREPAID" | "COLLECT";
  blType: "ORIGINAL" | "NON_NEGOTIABLE" | "SEAWAY_BILL";
  numberOfOriginals: number;
  issueDate: string;
  issuePlace: string;
}
