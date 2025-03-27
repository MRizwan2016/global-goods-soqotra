
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Currency and country options
const currencyOptions = [
  { value: "USD", label: "US Dollar ($)", symbol: "$", countries: ["United States", "Ecuador", "El Salvador"] },
  { value: "EUR", label: "Euro (€)", symbol: "€", countries: ["Germany", "France", "Italy", "Spain"] },
  { value: "GBP", label: "British Pound (£)", symbol: "£", countries: ["United Kingdom"] },
  { value: "INR", label: "Indian Rupee (₹)", symbol: "₹", countries: ["India"] },
  { value: "JPY", label: "Japanese Yen (¥)", symbol: "¥", countries: ["Japan"] },
  { value: "CNY", label: "Chinese Yuan (¥)", symbol: "¥", countries: ["China"] },
  { value: "AED", label: "UAE Dirham (د.إ)", symbol: "د.إ", countries: ["United Arab Emirates"] },
  { value: "SAR", label: "Saudi Riyal (﷼)", symbol: "﷼", countries: ["Saudi Arabia"] },
  { value: "QAR", label: "Qatari Riyal (﷼)", symbol: "﷼", countries: ["Qatar"] },
  { value: "SGD", label: "Singapore Dollar (S$)", symbol: "S$", countries: ["Singapore"] },
  { value: "LKR", label: "Sri Lankan Rupee (Rs)", symbol: "Rs", countries: ["Sri Lanka"] },
  { value: "PHP", label: "Philippine Peso (₱)", symbol: "₱", countries: ["Philippines"] },
];

const countryOptions = [
  { value: "US", label: "United States", currency: "USD" },
  { value: "UK", label: "United Kingdom", currency: "GBP" },
  { value: "IN", label: "India", currency: "INR" },
  { value: "AE", label: "United Arab Emirates", currency: "AED" },
  { value: "SA", label: "Saudi Arabia", currency: "SAR" },
  { value: "QA", label: "Qatar", currency: "QAR" },
  { value: "SG", label: "Singapore", currency: "SGD" },
  { value: "LK", label: "Sri Lanka", currency: "LKR" },
  { value: "PH", label: "Philippines", currency: "PHP" },
];

// Using a type for the form state to make it more maintainable
interface FormState {
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

// Define a comprehensive interface for invoice data to ensure type safety
interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  // Handle both formats of properties
  bookingForm?: string;
  bookNumber?: string;
  shipper1?: string;
  shipper?: string;
  consignee1?: string;
  consignee?: string;
  warehouse?: string;
  freightType?: string;
  shipmentType?: string;
  // Financial properties
  gross?: number;
  amount?: number;
  discount?: number;
  net?: number;
  paid?: boolean;
  // Additional properties that might exist in some invoice objects
  customer?: string;
  salesAgent?: string;
  doorToDoor?: boolean;
  nic?: string;
  volume?: string;
  weight?: string;
  packages?: number;
  handOverBy?: string;
  [key: string]: any; // To allow for other properties that may exist
}

export const useInvoicePayment = () => {
  const navigate = useNavigate();
  const [invoicePrefix, setInvoicePrefix] = useState("");
  const [matchingInvoices, setMatchingInvoices] = useState<Invoice[]>([]);
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCountry, setSelectedCountry] = useState("QA");
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencyOptions);
  const [currencySymbol, setCurrencySymbol] = useState("﷼");

  const [formState, setFormState] = useState<FormState>({
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
    amountPaid: 0,
    paymentCollectDate: format(new Date(), "yyyy-MM-dd"),
    receivableAccount: "CASH_IN_HAND",
    country: "QA",
    currency: "QAR"
  });

  // Get all invoices combining mock and stored data
  const getAllInvoices = (): Invoice[] => {
    const storedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]') as unknown[];
    const allInvoices = Array.from(JSON.parse(localStorage.getItem('mockInvoiceData') || '[]') as Invoice[]);
    
    storedInvoices.forEach((storedInvoice: any) => {
      if (storedInvoice.invoiceNumber && !allInvoices.some(inv => inv.invoiceNumber === storedInvoice.invoiceNumber)) {
        // Create a consistent structure regardless of source
        allInvoices.push({
          id: storedInvoice.id || `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          invoiceNumber: storedInvoice.invoiceNumber,
          date: storedInvoice.date || format(new Date(), "yyyy-MM-dd"),
          // Handle both bookingForm and bookNumber
          bookingForm: storedInvoice.bookingForm || storedInvoice.bookNumber || "",
          shipper1: storedInvoice.shipper || "",
          consignee1: storedInvoice.consignee || "",
          warehouse: storedInvoice.warehouse || "",
          freightType: storedInvoice.shipmentType || "",
          gross: storedInvoice.amount || 0,
          discount: 0,
          net: storedInvoice.amount || 0,
          paid: storedInvoice.paid || false
        });
      }
    });
    
    // Check for selectedInvoice from session storage (for direct navigation)
    const sessionInvoice = sessionStorage.getItem('selectedInvoice');
    if (sessionInvoice) {
      try {
        const parsedInvoice = JSON.parse(sessionInvoice) as any;
        // Check if this invoice is not already in our list
        if (parsedInvoice.invoiceNumber && !allInvoices.some(inv => inv.invoiceNumber === parsedInvoice.invoiceNumber)) {
          allInvoices.push({
            id: parsedInvoice.id || `session-${Date.now()}`,
            invoiceNumber: parsedInvoice.invoiceNumber,
            date: parsedInvoice.date || format(new Date(), "yyyy-MM-dd"),
            bookingForm: parsedInvoice.bookingForm || parsedInvoice.bookNumber || "",
            shipper1: parsedInvoice.shipper || "",
            consignee1: parsedInvoice.consignee || "",
            warehouse: parsedInvoice.warehouse || "",
            freightType: parsedInvoice.shipmentType || "",
            gross: parsedInvoice.amount || 0,
            discount: 0,
            net: parsedInvoice.amount || 0,
            paid: parsedInvoice.paid || false
          });
        }
        
        // Clear the session storage after use
        sessionStorage.removeItem('selectedInvoice');
      } catch (error) {
        console.error("Error parsing session invoice:", error);
      }
    }
    
    return allInvoices;
  };

  // Effect for filtering invoices based on prefix
  useEffect(() => {
    if (invoicePrefix.length >= 2) {
      const allInvoices = getAllInvoices();
      const filtered = allInvoices.filter(inv => 
        inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(invoicePrefix.toLowerCase())
      );
      setMatchingInvoices(filtered);
      setShowInvoiceSelector(filtered.length > 0);
    } else {
      setMatchingInvoices([]);
      setShowInvoiceSelector(false);
    }
  }, [invoicePrefix]);

  // Effect for calculating net amount and balance
  useEffect(() => {
    if (formState) {
      const netAmount = formState.grossAmount - formState.discount;
      const balanceToPay = netAmount - formState.totalPaid;
      
      setFormState(prev => ({
        ...prev,
        netAmount,
        balanceToPay
      }));
    }
  }, [formState.grossAmount, formState.discount, formState.totalPaid]);

  // Effect for handling country and currency selection
  useEffect(() => {
    if (selectedCountry) {
      const country = countryOptions.find(c => c.value === selectedCountry);
      if (country) {
        const defaultCurrency = country.currency;
        const currencyOption = currencyOptions.find(c => c.value === defaultCurrency);
        if (currencyOption) {
          setCurrencySymbol(currencyOption.symbol);
          setFormState(prev => ({ ...prev, currency: defaultCurrency }));
        }
        
        const relevantCurrencies = currencyOptions.filter(c => 
          c.value === defaultCurrency || c.value === "USD" || c.value === "EUR"
        );
        setFilteredCurrencies(relevantCurrencies);
      } else {
        setFilteredCurrencies(currencyOptions);
      }
    } else {
      setFilteredCurrencies(currencyOptions);
    }
  }, [selectedCountry]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (["grossAmount", "discount", "totalPaid", "amountPaid"].includes(name)) {
      const numValue = parseFloat(value) || 0;
      setFormState(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState(prev => ({ ...prev, [name]: value }));
    
    if (name === "country") {
      setSelectedCountry(value);
    }
    
    if (name === "currency") {
      const currency = currencyOptions.find(c => c.value === value);
      if (currency) {
        setCurrencySymbol(currency.symbol);
      }
    }
  };

  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormState(prev => ({ 
        ...prev, 
        paymentCollectDate: format(selectedDate, "yyyy-MM-dd") 
      }));
    }
  };

  // Handle invoice search
  const handleInvoiceSearch = () => {
    if (invoicePrefix.length < 2) {
      toast({
        title: "Search Error",
        description: "Please enter at least 2 characters of the invoice number",
        variant: "destructive"
      });
      return;
    }

    const allInvoices = getAllInvoices();
    const filtered = allInvoices.filter(inv => 
      inv.invoiceNumber && inv.invoiceNumber.toLowerCase().includes(invoicePrefix.toLowerCase())
    );
    
    if (filtered.length === 0) {
      toast({
        title: "No Matches Found",
        description: "No invoices match your search criteria",
        variant: "destructive"
      });
    } else {
      setMatchingInvoices(filtered);
      setShowInvoiceSelector(true);
    }
  };

  // Handle selecting an invoice
  const handleSelectInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    
    // Create a consistent mapping for invoice data regardless of source
    setFormState({
      ...formState,
      invoiceNumber: invoice.invoiceNumber,
      // Handle different property names for bookingForm
      bookingForm: invoice.bookingForm || invoice.bookNumber || "",
      shipper: invoice.shipper1 || invoice.shipper || "",
      consignee: invoice.consignee1 || invoice.consignee || "",
      warehouse: invoice.warehouse || "",
      shipmentType: invoice.freightType || invoice.shipmentType || "",
      grossAmount: invoice.gross || invoice.amount || 0,
      discount: invoice.discount || 0,
      netAmount: (invoice.net || invoice.amount || 0),
      totalPaid: invoice.paid ? (invoice.net || invoice.amount || 0) : 0,
      balanceToPay: invoice.paid ? 0 : (invoice.net || invoice.amount || 0),
      amountPaid: invoice.paid ? 0 : (invoice.net || invoice.amount || 0),
      country: formState.country,
      currency: formState.currency
    });
    
    setShowInvoiceSelector(false);
    toast({
      title: "Invoice Selected",
      description: `Invoice ${invoice.invoiceNumber} has been loaded`,
    });
  };

  // Handle saving the payment
  const handleSave = () => {
    if (!formState.invoiceNumber) {
      toast({
        title: "Validation Error",
        description: "Please select an invoice first",
        variant: "destructive"
      });
      return;
    }

    if (formState.amountPaid <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid payment amount",
        variant: "destructive"
      });
      return;
    }

    if (!formState.currency) {
      toast({
        title: "Validation Error",
        description: "Please select a currency",
        variant: "destructive"
      });
      return;
    }

    // Update stored invoices
    const storedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const updatedStoredInvoices = storedInvoices.map((inv: any) => {
      if (inv.invoiceNumber === formState.invoiceNumber) {
        return {
          ...inv,
          paid: true
        };
      }
      return inv;
    });
    localStorage.setItem('generatedInvoices', JSON.stringify(updatedStoredInvoices));
    
    // Create a payment record
    const paymentRecord = {
      id: `pay-${Date.now()}`,
      invoiceNumber: formState.invoiceNumber,
      amount: formState.amountPaid,
      currency: formState.currency,
      method: formState.receivableAccount,
      date: formState.paymentCollectDate,
      remarks: formState.remarks
    };
    
    // Save the payment record
    const payments = JSON.parse(localStorage.getItem('invoicePayments') || '[]');
    payments.push(paymentRecord);
    localStorage.setItem('invoicePayments', JSON.stringify(payments));
    
    toast({
      title: "Payment Recorded Successfully",
      description: `Payment of ${currencySymbol}${formState.amountPaid} for invoice ${formState.invoiceNumber} has been recorded.`,
    });

    navigate("/accounts/payments");
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
    selectedCountry,
    filteredCurrencies,
    currencySymbol,
    countryOptions,
    handleInputChange,
    handleSelectChange,
    handleDateSelect,
    handleInvoiceSearch,
    handleSelectInvoice,
    handleSave
  };
};
