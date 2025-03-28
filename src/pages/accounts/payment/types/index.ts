
export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingForm?: string;
  shipper?: string;
  consignee?: string;
  warehouse?: string;
  shipmentType?: string;
  grossAmount?: number;
  discount?: number;
  netAmount?: number;
  totalPaid?: number;
  balanceToPay?: number;
  // Additional fields needed for component compatibility
  date?: string;
  net?: number;
  amount?: number;
  consignee1?: string;
  shipper1?: string;
  bookNumber?: string;
  freightType?: string;
  gross?: number;
  paid?: boolean;
}

export interface FormState {
  invoiceNumber: string;
  bookingForm: string;
  shipper: string;
  consignee: string;
  warehouse: string;
  shipmentType: string;
  remarks: string;
  grossAmount: number;
  discount: number;
  netAmount: number;
  totalPaid: number;
  balanceToPay: number;
  amountPaid: number;
  paymentCollectDate: string;
  receivableAccount: string;
  country: string;
  currency: string;
}
