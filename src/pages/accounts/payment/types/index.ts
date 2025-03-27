
export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingForm: string;
  shipper: string;
  consignee: string;
  warehouse: string;
  shipmentType: string;
  grossAmount: number;
  discount: number;
  netAmount: number;
  totalPaid: number;
  balanceToPay: number;
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
