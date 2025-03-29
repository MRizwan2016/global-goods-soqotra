
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useInvoiceSearch } from "./useInvoiceSearch";
import { usePaymentSave } from "./usePaymentSave";
import { amountWithinRange, getBalanceForPayment } from "../utils/amountCalculations";
import { FormState } from "../types";

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
    country: "",
    currency: "",
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
  
  const { handleSave } = usePaymentSave(formState);
  
  // Handle selecting an invoice
  const handleSelectInvoice = (invoice: any) => {
    // First set the selected invoice
    setSelectedInvoice(invoice);
    setShowInvoiceSelector(false);
    
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
      balanceToPay: balanceToPay,
      amountPaid: balanceToPay, // Default to paying the full amount
      currency: invoice.currency || "", // Use currency from invoice if available
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
    
    // Check if amount is within valid range
    if (amountWithinRange(value, formState.balanceToPay)) {
      setFormState(prev => ({ ...prev, amountPaid: value }));
    } else if (value > formState.balanceToPay) {
      // Allow overpayment but show warning
      setFormState(prev => ({ ...prev, amountPaid: value }));
      toast.warning("Overpayment", {
        description: `The amount exceeds the balance due of ${currencySymbol}${formState.balanceToPay}`,
      });
    }
  };

  // Get the currency and country functions
  const useCurrencyCountry = () => {
    const [selectedCountry, setSelectedCountry] = useState<string>("Qatar");
    const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>(["QAR"]);
    const [currencySymbol, setCurrencySymbol] = useState<string>("QR");
    
    // Define country currency mapping
    const COUNTRY_CURRENCY_MAP: Record<string, string[]> = {
      "Qatar": ["QAR"],
      "UAE": ["AED"],
      "USA": ["USD"],
      "Kenya": ["KES"],
      "India": ["INR"],
      "Sri Lanka": ["LKR"],
      "European Union": ["EUR"]
    };
    
    // All country options from the map
    const countryOptions = Object.keys(COUNTRY_CURRENCY_MAP);
    
    useEffect(() => {
      // Get currencies for the selected country
      if (selectedCountry) {
        setFilteredCurrencies(COUNTRY_CURRENCY_MAP[selectedCountry] || []);
      }
    }, [selectedCountry]);
    
    // Update currency symbol when currency changes
    useEffect(() => {
      if (filteredCurrencies.length > 0) {
        const currency = filteredCurrencies[0];
        
        if (currency === "USD") {
          setCurrencySymbol("$");
        } else if (currency === "EUR") {
          setCurrencySymbol("€");
        } else if (currency === "QAR") {
          setCurrencySymbol("QR");
        } else if (currency === "AED") {
          setCurrencySymbol("AED");
        } else if (currency === "KES") {
          setCurrencySymbol("KSh");
        } else if (currency === "INR") {
          setCurrencySymbol("₹");
        } else if (currency === "LKR") {
          setCurrencySymbol("Rs");
        } else {
          setCurrencySymbol(currency);
        }
      }
    }, [filteredCurrencies]);
    
    // Handle country change
    const handleCountryChange = (country: string) => {
      setSelectedCountry(country);
    };
    
    return {
      selectedCountry,
      currencySymbol,
      countryOptions,
      filteredCurrencies,
      handleCountryChange
    };
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
