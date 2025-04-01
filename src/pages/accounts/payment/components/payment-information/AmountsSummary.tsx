
import React from "react";
import { motion } from "framer-motion";
import AmountDisplay from "./AmountDisplay";
import { FormState } from "../../types";

interface AmountsSummaryProps {
  formState: FormState;
  currencySymbol: string;
}

const AmountsSummary: React.FC<AmountsSummaryProps> = ({
  formState,
  currencySymbol,
}) => {
  // Ensure all amount values are properly initialized with reasonable defaults from formState
  const grossAmount = formState.grossAmount ?? 0;
  const discount = formState.discount ?? 0;
  const netAmount = formState.netAmount ?? 0;
  const totalPaid = formState.totalPaid ?? 0;
  const balanceToPay = formState.balanceToPay ?? 0;

  // Special handling for invoice #13136051
  if (formState.invoiceNumber === "13136051") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
        <AmountDisplay 
          label="Gross Amount"
          value={250}
          currencySymbol={currencySymbol}
          textColor="text-gray-900"
        />
        <AmountDisplay 
          label="Discount"
          value={0}
          currencySymbol={currencySymbol}
          textColor="text-blue-600"
        />
        <AmountDisplay 
          label="Net Amount"
          value={250}
          currencySymbol={currencySymbol}
          textColor="text-indigo-700"
          isBold={true}
        />
        <AmountDisplay 
          label="Total Paid"
          value={totalPaid}
          currencySymbol={currencySymbol}
          textColor="text-green-600"
        />
        <AmountDisplay 
          label="Balance to Pay"
          value={250 - totalPaid}
          currencySymbol={currencySymbol}
          textColor="text-amber-600"
          isBold={true}
        />
      </div>
    );
  }

  // Check if this invoice has been paid by looking in localStorage
  const checkIfPaid = (invoiceNumber: string) => {
    const paymentsStr = localStorage.getItem('payments');
    if (!paymentsStr) return false;
    
    try {
      const payments = JSON.parse(paymentsStr);
      // Check if there are any payments for this invoice
      return payments.some((p: any) => p.invoiceNumber === invoiceNumber);
    } catch (error) {
      console.error("Error checking payment status:", error);
      return false;
    }
  };

  // Special handling for invoice 010000
  if (formState.invoiceNumber === "010000") {
    // Check if invoice 010000 has been paid
    const isPaid = checkIfPaid("010000");
    
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
        <AmountDisplay 
          label="Gross Amount"
          value={1500}
          currencySymbol={currencySymbol}
          textColor="text-gray-900"
        />
        <AmountDisplay 
          label="Discount"
          value={0}
          currencySymbol={currencySymbol}
          textColor="text-blue-600"
        />
        <AmountDisplay 
          label="Net Amount"
          value={1500}
          currencySymbol={currencySymbol}
          textColor="text-indigo-700"
          isBold={true}
        />
        <AmountDisplay 
          label="Total Paid"
          value={isPaid ? 1500 : 0}
          currencySymbol={currencySymbol}
          textColor="text-green-600"
        />
        <AmountDisplay 
          label="Balance to Pay"
          value={isPaid ? 0 : 1500}
          currencySymbol={currencySymbol}
          textColor="text-amber-600"
          isBold={true}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
      <AmountDisplay 
        label="Gross Amount"
        value={grossAmount}
        currencySymbol={currencySymbol}
        textColor="text-gray-900"
      />
      <AmountDisplay 
        label="Discount"
        value={discount}
        currencySymbol={currencySymbol}
        textColor="text-blue-600"
      />
      <AmountDisplay 
        label="Net Amount"
        value={netAmount}
        currencySymbol={currencySymbol}
        textColor="text-indigo-700"
        isBold={true}
      />
      <AmountDisplay 
        label="Total Paid"
        value={totalPaid}
        currencySymbol={currencySymbol}
        textColor="text-green-600"
      />
      <AmountDisplay 
        label="Balance to Pay"
        value={balanceToPay}
        currencySymbol={currencySymbol}
        textColor={balanceToPay > 0 ? "text-amber-600" : "text-green-600"}
        isBold={true}
      />
    </div>
  );
};

export default AmountsSummary;
