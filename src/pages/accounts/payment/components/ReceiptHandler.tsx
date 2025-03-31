
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FormState } from "../types";
import ReceiptView from "@/components/payment/ReceiptView";

interface ReceiptHandlerProps {
  formState: FormState;
  customerName: string;
}

// Use forwardRef to properly handle the ref from parent component
const ReceiptHandler = forwardRef<HTMLDivElement, ReceiptHandlerProps>(
  ({ formState, customerName }, ref) => {
    const [showReceipt, setShowReceipt] = useState(false);
    const [receiptData, setReceiptData] = useState({
      receiptNumber: "",
      invoiceNumber: "",
      date: "",
      customer: "",
      amount: 0,
      paymentMethod: "cash",
      currency: "QAR",
      remarks: ""
    });

    // Function to generate receipt
    const generateReceipt = () => {
      if (!formState.invoiceNumber || formState.amountPaid <= 0) {
        return false;
      }

      // Generate a receipt number
      const receiptNumber = `R-${Date.now().toString().substring(6)}`;
      
      // Set receipt data
      setReceiptData({
        receiptNumber: receiptNumber,
        invoiceNumber: formState.invoiceNumber,
        date: formState.paymentCollectDate,
        customer: formState.customerName || customerName,
        amount: formState.amountPaid,
        paymentMethod: formState.receivableAccount,
        currency: formState.currency,
        remarks: formState.remarks
      });
      
      // Show receipt modal
      setShowReceipt(true);
      return true;
    };

    // Expose the generateReceipt method to the parent component via ref
    useImperativeHandle(ref, () => ({
      generateReceipt
    }));

    return (
      <>
        {/* Receipt View */}
        <ReceiptView 
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          receiptData={receiptData}
        />
      </>
    );
  }
);

// Add display name for better debugging
ReceiptHandler.displayName = "ReceiptHandler";

export default ReceiptHandler;
