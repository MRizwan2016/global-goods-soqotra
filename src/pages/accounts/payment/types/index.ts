
export interface FormState {
  invoiceNumber: string;
  customerName: string;
  bookingForm: string;
  balanceToPay: number;
  amountPaid: number;
  remarks: string;
  receivableAccount: string;
  country: string;
  currency: string;
  paymentCollectDate: string;
  [key: string]: any; // Allow additional properties
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  shipper1?: string;
  consignee1?: string;
  net: number;
  paid: boolean;
  balanceToPay?: number;
  currency?: string;
  // Additional properties for mock data
  bookingForm?: string;
  bookNumber?: string;
  shipper?: string;
  consignee?: string;
  warehouse?: string;
  shipmentType?: string;
  freightType?: string;
  grossAmount?: number;
  discount?: number;
  netAmount?: number;
  totalPaid?: number;
  amount?: number;
  paidAmount?: number;
  [key: string]: any; // Allow additional properties
}
