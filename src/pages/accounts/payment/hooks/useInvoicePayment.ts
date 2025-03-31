
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useInvoiceSearch } from "./useInvoiceSearch";
import { usePaymentSave } from "./usePaymentSave";
import { useCurrencyCountry } from "./useCurrencyCountry";
import { FormState } from "../types";
import { getBalanceForPayment } from "../utils/amountCalculations";

export const useInvoicePayment = () => {
  const navigate = useNavigate();
  
  // Get the current date
  const today = new Date();
  const [date, setDate] = useState<Date>(today);
  
  // Initialize form state
  const [formState, setFormState] = useState<FormState>({
    invoiceNumber: "",
    customerName: "",
    bookingForm: "",
    balanceToPay: 0,
    amountPaid: 0,
    remarks: "",
    receivableAccount: "cash",
    country: "Qatar",
    currency: "QAR",
    paymentCollectDate: today.toISOString().split('T')[0],
  });
  
  // Import hooks
  const {
    invoicePrefix,
    setInvoicePrefix,
    matchingInvoices,
    showInvoiceSelector,
    setShowInvoiceSelector,
    selectedInvoice,
    setSelectedInvoice,
    handleInvoiceSearch,
  } = useInvoiceSearch();
  
  const {
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleCountryChange,
  } = useCurrencyCountry();
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (["amountPaid"].includes(name)) {
      const numValue = parseFloat(value) || 0;
      setFormState(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormState(prev => ({ 
        ...prev, 
        paymentCollectDate: selectedDate.toISOString().split('T')[0]
      }));
    }
  };
  
  const { handleSave } = usePaymentSave(formState, currencySymbol);
  
  // Handle selecting an invoice
  const handleSelectInvoice = (invoice: any) => {
    // First set the selected invoice
    setSelectedInvoice(invoice);
    setShowInvoiceSelector(false);
    
    // Special handling for invoice 010000
    if (invoice.invoiceNumber === "010000") {
      setFormState(prev => ({
        ...prev,
        invoiceNumber: "010000",
        customerName: "PASTOR ZACH RICH",
        bookingForm: "BF-10000",
        shipper: "Global Exports Ltd.",
        consignee: "PASTOR ZACH RICH",
        warehouse: "Main Warehouse",
        shipmentType: "Air Freight",
        grossAmount: 1500,
        discount: 0,
        netAmount: 1500,
        totalPaid: 0,
        balanceToPay: 1500,
        amountPaid: 1500,
        currency: "QAR",
        country: "Qatar",
      }));
      
      toast.success("Invoice Selected", {
        description: `Invoice 010000 loaded for payment`,
      });
      return;
    }
    
    // Get the balance to pay (either from invoice.balanceToPay or calculate it)
    const balanceToPay = getBalanceForPayment(invoice);
    
    // Get customer name from various possible properties
    const customerName = invoice.consignee1 || invoice.consignee || invoice.customer || "";
    
    // Set form state with invoice details
    setFormState(prev => ({
      ...prev,
      invoiceNumber: invoice.invoiceNumber,
      customerName: customerName,
      bookingForm: invoice.bookingForm || invoice.bookNumber || "",
      shipper: invoice.shipper1 || invoice.shipper || "",
      consignee: invoice.consignee1 || invoice.consignee || "",
      warehouse: invoice.warehouse || "",
      shipmentType: invoice.freightType || invoice.shipmentType || "",
      grossAmount: invoice.gross || invoice.grossAmount || 0,
      discount: invoice.discount || 0,
      netAmount: invoice.net || invoice.amount || invoice.netAmount || 0,
      totalPaid: invoice.totalPaid || 0,
      balanceToPay: balanceToPay,
      amountPaid: balanceToPay, // Default to paying the full amount
      currency: invoice.currency || prev.currency, // Use currency from invoice if available
    }));
    
    // If invoice has currency, try to set the matching country
    if (invoice.currency) {
      setFormState(prev => ({
        ...prev,
        currency: invoice.currency,
        country: prev.country || "Qatar" // Default to Qatar if no country set yet
      }));
    }
    
    // Show toast notification
    toast.success("Invoice Selected", {
      description: `Invoice ${invoice.invoiceNumber} loaded for payment`,
    });
  };
  
  // Handle payment amount change with validation
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    
    // Check if it's a valid number
    if (isNaN(value)) {
      setFormState(prev => ({ ...prev, amountPaid: 0 }));
      return;
    }
    
    // Special handling for invoice 010000
    if (formState.invoiceNumber === "010000") {
      setFormState(prev => ({ ...prev, amountPaid: value }));
      
      // Only show warning if not exact amount
      if (value !== 1500) {
        toast.warning("Incorrect Amount", {
          description: `Invoice 010000 requires payment of exactly ${currencySymbol} 1500.00`,
        });
      }
      return;
    }
    
    // Set the amount regardless
    setFormState(prev => ({ ...prev, amountPaid: value }));
    
    // Show warning if overpayment and not invoice 010000
    if (value > formState.balanceToPay && formState.invoiceNumber !== "010000") {
      toast.warning("Overpayment", {
        description: `The amount exceeds the balance due of ${currencySymbol}${formState.balanceToPay.toFixed(2)}`,
      });
    }
  };
  
  return {
    formState,
    invoicePrefix,
    setInvoicePrefix,
    matchingInvoices,
    showInvoiceSelector,
    setShowInvoiceSelector,
    selectedInvoice,
    date,
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleInputChange,
    handleSelectChange,
    handleDateSelect,
    handleInvoiceSearch,
    handleSelectInvoice,
    handleSave,
    handleCountryChange,
    handlePaymentAmountChange
  };
};
