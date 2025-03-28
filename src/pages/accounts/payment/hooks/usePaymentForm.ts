
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

  return {
    formState,
    date,
    handleInputChange,
    handleSelectChange,
    handleDateSelect: handleDateSelectWithState,
    handleSelectInvoice,
    handleSave
  };
};
