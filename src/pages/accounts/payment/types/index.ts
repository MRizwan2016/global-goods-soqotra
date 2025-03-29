
import { DateValue } from "react-day-picker";

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
  [key: string]: any; // Allow additional properties
}
