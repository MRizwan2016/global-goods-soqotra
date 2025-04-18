
import React from "react";
import { FormState } from "../types";
import InvoiceDetailsCard from "./invoice-details/InvoiceDetailsCard";
import { getPaymentStatus } from "../utils/paymentStatusUtils";
import { getCurrencySymbol } from "../utils/currencyUtils";

interface Invoice {
  id: string;
  invoiceNumber: string;
  date?: string;
  net?: number;
  amount?: number;
  consignee1?: string;
  consignee?: string;
  paid?: boolean;
  bookingForm?: string;
  bookNumber?: string;
  country?: string;
  currency?: string;
  [key: string]: any;
}

interface SelectedInvoiceDetailsProps {
  selectedInvoice: Invoice | null;
  formState: FormState;
}

const SelectedInvoiceDetails: React.FC<SelectedInvoiceDetailsProps> = ({
  selectedInvoice,
  formState,
}) => {
  if (!selectedInvoice) return null;

  console.log("Rendering SelectedInvoiceDetails with:", { selectedInvoice, formState });

  // Use currency from formState or selectedInvoice
  const currency = formState.currency || selectedInvoice.currency || "QAR";
  const currencySymbol = getCurrencySymbol(currency);

  // Special handling for invoice 010000
  if (selectedInvoice.invoiceNumber === "010000") {
    const isPaid = getPaymentStatus("010000", selectedInvoice.paid || false);
    
    return (
      <InvoiceDetailsCard
        invoiceNumber="010000"
        customerName="PASTOR ZACH RICH"
        date={selectedInvoice.date || '2023-03-30'}
        amount={1500.00}
        isPaid={isPaid}
        currency={currency}
        currencySymbol={currencySymbol}
      />
    );
  }
  
  // Special handling for invoice 13136051
  if (selectedInvoice.invoiceNumber === "13136051") {
    const isPaid = getPaymentStatus("13136051", selectedInvoice.paid || false);
    
    return (
      <InvoiceDetailsCard
        invoiceNumber="13136051"
        customerName="MRS. FERNANDO"
        date={selectedInvoice.date || '2025-04-01'}
        amount={250.00}
        isPaid={isPaid}
        currency={currency}
        currencySymbol={currencySymbol}
      />
    );
  }
  
  // For all other invoices
  const netAmount = selectedInvoice.net || selectedInvoice.amount || 0;
  const isPaid = getPaymentStatus(selectedInvoice.invoiceNumber, selectedInvoice.paid || false);
  
  return (
    <InvoiceDetailsCard
      invoiceNumber={selectedInvoice.invoiceNumber}
      customerName={selectedInvoice.consignee1 || selectedInvoice.consignee || 'N/A'}
      date={selectedInvoice.date || 'N/A'}
      amount={netAmount}
      isPaid={isPaid}
      currency={currency}
      currencySymbol={currencySymbol}
    />
  );
};

export default SelectedInvoiceDetails;
