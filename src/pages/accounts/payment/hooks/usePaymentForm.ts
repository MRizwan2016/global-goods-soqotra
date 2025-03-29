
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { FormState, Invoice } from "../types";
import { useFormInputHandlers } from "./useFormInputHandlers";
import { useInvoiceSelection } from "./useInvoiceSelection";
import { usePaymentSave } from "./usePaymentSave";
import { recalculateAmounts } from "../utils/amountCalculations";
import { DEFAULT_PAYMENT_FORM_VALUES } from "../constants/paymentConstants";

/**
 * Hook for managing payment form state and interactions
 */
export const usePaymentForm = (
  selectedInvoice: Invoice | null,
  setSelectedInvoice: React.Dispatch<React.SetStateAction<Invoice | null>>,
  setShowInvoiceSelector: React.Dispatch<React.SetStateAction<boolean>>,
  selectedCountry: string,
  currencySymbol: string
) => {
  // Initial form state
  const initialFormState: FormState = {
    invoiceNumber: "",
    customerName: "", // Add customerName required by FormState
    bookingForm: "",
    shipper: "",
    consignee: "",
    warehouse: "",
    shipmentType: "",
    remarks: "",
    grossAmount: 0,
    discount: 0,
    netAmount: 0,
    totalPaid: 0,
    balanceToPay: 0,
    amountPaid: DEFAULT_PAYMENT_FORM_VALUES.amountPaid,
    paymentCollectDate: format(new Date(), "yyyy-MM-dd"),
    receivableAccount: DEFAULT_PAYMENT_FORM_VALUES.receivableAccount,
    country: selectedCountry,
    currency: DEFAULT_PAYMENT_FORM_VALUES.currency
  };

  // Use form input handlers
  const { 
    formState, 
    setFormState, 
    handleInputChange, 
    handleSelectChange, 
    handleDateSelect 
  } = useFormInputHandlers(initialFormState);
  
  // Use invoice selection handler
  const { handleSelectInvoice } = useInvoiceSelection(
    setFormState, 
    setSelectedInvoice, 
    setShowInvoiceSelector
  );
  
  // Use payment save handler
  const { handleSave } = usePaymentSave(formState, currencySymbol);

  // Date state
  const [date, setDate] = useState<Date>(new Date());
  
  // Effect for handling selected invoice and setting suggested payment amount
  useEffect(() => {
    if (selectedInvoice && formState) {
      console.log("Selected invoice in usePaymentForm:", selectedInvoice);
      
      // Get relevant fields from invoice
      const grossAmount = selectedInvoice.gross || selectedInvoice.grossAmount || 0;
      const discount = selectedInvoice.discount || 0;
      const netAmount = selectedInvoice.net || selectedInvoice.amount || selectedInvoice.netAmount || 0;
      const totalPaid = selectedInvoice.totalPaid || 0;
      const balanceToPay = netAmount - totalPaid;
      
      // Set the invoice date to the payment date if available
      if (selectedInvoice.date) {
        try {
          const selectedDate = new Date(selectedInvoice.date);
          setDate(selectedDate);
          handleDateSelect(selectedDate);  // Fixed: Only passing the date parameter
        } catch (error) {
          console.error("Error parsing invoice date:", error);
        }
      }
      
      // Update form state with invoice data
      setFormState(prev => ({
        ...prev,
        invoiceNumber: selectedInvoice.invoiceNumber || "",
        customerName: selectedInvoice.consignee1 || selectedInvoice.consignee || "",
        bookingForm: selectedInvoice.bookingForm || selectedInvoice.bookNumber || "",
        shipper: selectedInvoice.shipper1 || selectedInvoice.shipper || "",
        consignee: selectedInvoice.consignee1 || selectedInvoice.consignee || "",
        warehouse: selectedInvoice.warehouse || "",
        shipmentType: selectedInvoice.freightType || selectedInvoice.shipmentType || "",
        grossAmount: grossAmount,
        discount: discount,
        netAmount: netAmount,
        totalPaid: totalPaid,
        balanceToPay: balanceToPay,
        amountPaid: balanceToPay,
        currency: selectedInvoice.currency || prev.currency
      }));
    }
  }, [selectedInvoice]);
  
  // Effect for calculating amounts when relevant values change
  useEffect(() => {
    if (formState) {
      const updatedAmounts = recalculateAmounts(formState);
      
      setFormState(prev => ({
        ...prev,
        ...updatedAmounts
      }));
    }
  }, [formState.grossAmount, formState.discount, formState.totalPaid]);
  
  // Effect for handling date changes
  useEffect(() => {
    const paymentDate = formState.paymentCollectDate 
      ? new Date(formState.paymentCollectDate) 
      : new Date();
    setDate(paymentDate);
  }, [formState.paymentCollectDate]);
  
  // Handle date selection with the state update
  const handleDateSelectWithState = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      handleDateSelect(selectedDate);
    }
  };

  // Custom input change handler specifically for amountPaid
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const numValue = parseFloat(value) || 0;
    
    // Allow any amount between 0 and the balance to pay
    if (numValue >= 0) {
      setFormState(prev => ({ 
        ...prev, 
        amountPaid: numValue 
      }));
    }
  };

  return {
    formState,
    date,
    handleInputChange,
    handleSelectChange,
    handleDateSelect: handleDateSelectWithState,
    handleSelectInvoice,
    handleSave,
    handlePaymentAmountChange
  };
};
