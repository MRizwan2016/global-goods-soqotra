
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { FormState } from "../types";
import ReceiptView from "@/components/payment/ReceiptView";
import { toast } from "sonner";

interface ReceiptHandlerProps {
  formState: FormState;
  customerName: string;
}

// Define the ref interface to expose our methods
export interface ReceiptHandlerRef {
  generateReceipt: () => boolean;
}

// Use forwardRef with the proper type parameters
const ReceiptHandler = forwardRef<ReceiptHandlerRef, ReceiptHandlerProps>(
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
        toast.error("Cannot generate receipt. Please ensure an invoice is selected and payment amount is entered.");
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
      toast.success("Receipt generated successfully!");
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
