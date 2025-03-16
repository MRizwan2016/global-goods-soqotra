
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { 
  ArrowLeft, 
  Search, 
  Calendar as CalendarIcon, 
  CreditCard, 
  DollarSign, 
  CheckCircle2,
  Globe,
  CircleDollarSign,
  Banknote
} from "lucide-react";
import { mockInvoiceData } from "@/data/mockData";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Currency data with symbols and country information
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

// Countries that the company operates in
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

// Form validation schema
const formSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  amountPaid: z.number().min(0.01, "Amount must be greater than 0"),
  paymentDate: z.date(),
  paymentMethod: z.string().min(1, "Payment method is required"),
  remarks: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  currency: z.string().min(1, "Currency is required"),
});

const AddInvoicePayment = () => {
  const navigate = useNavigate();
  const [invoicePrefix, setInvoicePrefix] = useState("");
  const [matchingInvoices, setMatchingInvoices] = useState<any[]>([]);
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedCountry, setSelectedCountry] = useState("");
  const [filteredCurrencies, setFilteredCurrencies] = useState(currencyOptions);
  const [currencySymbol, setCurrencySymbol] = useState("$");
  
  // Initialize form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invoiceNumber: "",
      amountPaid: 0,
      paymentDate: new Date(),
      paymentMethod: "CASH_IN_HAND",
      remarks: "",
      country: "",
      currency: "USD",
    },
  });
  
  const [formState, setFormState] = useState({
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
    country: "",
    currency: "USD"
  });

  // Filter GY invoices when prefix is typed
  useEffect(() => {
    if (invoicePrefix.length >= 3) {
      const filtered = mockInvoiceData.filter(inv => 
        inv.invoiceNumber.toLowerCase().startsWith(invoicePrefix.toLowerCase())
      );
      setMatchingInvoices(filtered);
      setShowInvoiceSelector(filtered.length > 0);
    } else {
      setMatchingInvoices([]);
      setShowInvoiceSelector(false);
    }
  }, [invoicePrefix]);

  // Calculate derived values
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

  // Filter currencies based on selected country
  useEffect(() => {
    if (selectedCountry) {
      const country = countryOptions.find(c => c.value === selectedCountry);
      if (country) {
        const defaultCurrency = country.currency;
        const currencyOption = currencyOptions.find(c => c.value === defaultCurrency);
        if (currencyOption) {
          setCurrencySymbol(currencyOption.symbol);
          setFormState(prev => ({ ...prev, currency: defaultCurrency }));
          form.setValue("currency", defaultCurrency);
        }
        
        // Filter currencies that are commonly used in this country
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
  }, [selectedCountry, form]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric fields
    if (["grossAmount", "discount", "totalPaid", "amountPaid"].includes(name)) {
      const numValue = parseFloat(value) || 0;
      setFormState(prev => ({ ...prev, [name]: numValue }));
    } else {
      setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

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

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      setFormState(prev => ({ 
        ...prev, 
        paymentCollectDate: format(selectedDate, "yyyy-MM-dd") 
      }));
      form.setValue("paymentDate", selectedDate);
    }
  };

  const handleInvoiceSearch = () => {
    if (invoicePrefix.length < 3) {
      toast({
        title: "Search Error",
        description: "Please enter at least 3 characters of the invoice number",
        variant: "destructive"
      });
      return;
    }

    // Search is handled by the useEffect
  };

  const handleSelectInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setFormState({
      ...formState,
      invoiceNumber: invoice.invoiceNumber,
      bookingForm: invoice.bookNumber || "",
      shipper: invoice.shipper1 || "",
      consignee: invoice.consignee1 || "",
      warehouse: invoice.warehouse || "",
      shipmentType: invoice.freightType || "",
      grossAmount: invoice.gross || 0,
      discount: invoice.discount || 0,
      netAmount: (invoice.gross || 0) - (invoice.discount || 0),
      totalPaid: invoice.paid ? invoice.net : 0,
      balanceToPay: invoice.paid ? 0 : invoice.net,
      country: formState.country,
      currency: formState.currency
    });
    
    form.setValue("invoiceNumber", invoice.invoiceNumber);
    
    setShowInvoiceSelector(false);
    toast({
      title: "Invoice Selected",
      description: `Invoice ${invoice.invoiceNumber} has been loaded`,
    });
  };

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

    // Here you would save the payment data to your backend
    toast({
      title: "Payment Recorded Successfully",
      description: `Payment of ${currencySymbol}${formState.amountPaid} for invoice ${formState.invoiceNumber} has been recorded.`,
    });

    // Redirect to payment list
    navigate("/accounts/payments");
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <PrivateRoute requiredFile="paymentMethods">
      <Layout title="Add Invoice Payment">
        <div className="container mx-auto p-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center mb-6"
          >
            <Button 
              variant="outline" 
              onClick={() => navigate("/accounts/payments")}
              className="mr-4 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payments
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-700 to-purple-500 bg-clip-text text-transparent">
                Record Invoice Payment
              </h1>
              <p className="text-muted-foreground">
                Record a new payment against an invoice with currency selection
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            <Card className="mb-8 shadow-lg border-t-4 border-t-indigo-500 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-white border-b border-indigo-100">
                <CardTitle className="text-xl text-indigo-800 flex items-center gap-2">
                  <Search className="h-5 w-5 text-indigo-500" />
                  Search Invoice
                </CardTitle>
                <CardDescription>
                  Enter the first few characters of an invoice number to search
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <motion.div 
                  variants={item}
                  className="flex gap-4 items-start mb-6"
                >
                  <div className="w-full max-w-md relative">
                    <label className="text-sm font-medium mb-1 block text-gray-700">
                      Enter Invoice Number (GY format):
                    </label>
                    <div className="flex">
                      <Input
                        value={invoicePrefix}
                        onChange={(e) => setInvoicePrefix(e.target.value)}
                        placeholder="Start typing GY..."
                        className="rounded-r-none border-r-0 focus-visible:ring-1 focus-visible:ring-indigo-400"
                      />
                      <Button 
                        onClick={handleInvoiceSearch}
                        className="rounded-l-none bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Animated Invoice selector dropdown */}
                    <AnimatePresence>
                      {showInvoiceSelector && (
                        <motion.div 
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="mt-1 border rounded-md shadow-lg max-h-60 overflow-y-auto absolute z-50 bg-white w-full border-indigo-200"
                        >
                          <div className="p-2 bg-indigo-50 border-b border-indigo-100">
                            <h4 className="text-sm font-medium text-indigo-800">Matching Invoices</h4>
                          </div>
                          {matchingInvoices.length > 0 ? (
                            <div>
                              {matchingInvoices.map((invoice) => (
                                <motion.div
                                  key={invoice.id}
                                  className="p-3 hover:bg-indigo-50 cursor-pointer border-b last:border-0 transition-colors"
                                  onClick={() => handleSelectInvoice(invoice)}
                                  whileHover={{ backgroundColor: "rgba(238, 242, 255, 0.6)" }}
                                >
                                  <div className="flex justify-between">
                                    <span className="font-medium text-indigo-800">{invoice.invoiceNumber}</span>
                                    <span className="text-sm text-gray-500">{invoice.consignee1}</span>
                                  </div>
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span className="text-indigo-600 font-medium">Amount: ${invoice.net}</span>
                                    <span>Date: {invoice.date}</span>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              No matching invoices found
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Country and Currency Selection */}
                <motion.div 
                  variants={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-indigo-100 shadow-inner"
                >
                  <h3 className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-500" />
                    Country and Currency Selection
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <Globe className="h-4 w-4 text-indigo-600" />
                        Country Office:
                      </label>
                      <Select
                        value={formState.country}
                        onValueChange={(value) => handleSelectChange("country", value)}
                      >
                        <SelectTrigger className="border-indigo-200 focus:ring-indigo-300">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {countryOptions.map((country) => (
                            <SelectItem key={country.value} value={country.value} className="cursor-pointer">
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <CircleDollarSign className="h-4 w-4 text-green-600" />
                        Currency:
                      </label>
                      <Select
                        value={formState.currency}
                        onValueChange={(value) => handleSelectChange("currency", value)}
                      >
                        <SelectTrigger className="border-green-200 focus:ring-green-300">
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent className="bg-white z-50">
                          {filteredCurrencies.map((currency) => (
                            <SelectItem key={currency.value} value={currency.value} className="cursor-pointer">
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                {selectedInvoice && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border p-4 rounded-md bg-gradient-to-r from-indigo-50 to-purple-50 mb-6 shadow-inner"
                  >
                    <h3 className="font-medium mb-3 text-indigo-800 flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      Selected Invoice Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Invoice Number:</span>
                        <p className="font-semibold text-gray-900">{selectedInvoice.invoiceNumber}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Customer:</span>
                        <p className="font-semibold text-gray-900">{selectedInvoice.consignee1}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Date:</span>
                        <p className="font-semibold text-gray-900">{selectedInvoice.date}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Total Amount:</span>
                        <p className="font-semibold text-gray-900">{currencySymbol}{selectedInvoice.net}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Payment Status:</span>
                        <p className="font-semibold">
                          {selectedInvoice.paid ? 
                            <span className="text-green-600">Paid</span> : 
                            <span className="text-amber-600">Unpaid</span>
                          }
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <motion.div variants={item} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">INVOICE NUMBER:</label>
                      <Input
                        name="invoiceNumber"
                        value={formState.invoiceNumber}
                        onChange={handleInputChange}
                        readOnly
                        className="bg-gray-50 border-gray-200 font-medium"
                      />
                    </motion.div>
                    
                    <motion.div variants={item} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">BOOKING FORM:</label>
                      <Input
                        name="bookingForm"
                        value={formState.bookingForm}
                        onChange={handleInputChange}
                        readOnly
                        className="bg-gray-50 border-gray-200"
                      />
                    </motion.div>
                    
                    <motion.div variants={item} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">SHIPPER:</label>
                      <Input
                        name="shipper"
                        value={formState.shipper}
                        onChange={handleInputChange}
                        readOnly
                        className="bg-gray-50 border-gray-200"
                      />
                    </motion.div>
                    
                    <motion.div variants={item} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">CONSIGNEE:</label>
                      <Input
                        name="consignee"
                        value={formState.consignee}
                        onChange={handleInputChange}
                        readOnly
                        className="bg-gray-50 border-gray-200"
                      />
                    </motion.div>
                    
                    <motion.div variants={item} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">WAREHOUSE:</label>
                      <Input
                        name="warehouse"
                        value={formState.warehouse}
                        onChange={handleInputChange}
                        readOnly
                        className="bg-gray-50 border-gray-200"
                      />
                    </motion.div>
                    
                    <motion.div variants={item} className="flex flex-col">
                      <label className="text-sm font-medium mb-1 text-gray-700">SHIPMENT TYPE:</label>
                      <Input
                        name="shipmentType"
                        value={formState.shipmentType}
                        onChange={handleInputChange}
                        readOnly
                        className="bg-gray-50 border-gray-200"
                      />
                    </motion.div>
                    
                    <motion.div variants={item} className="flex flex-col md:col-span-2">
                      <label className="text-sm font-medium mb-1 text-gray-700">REMARKS:</label>
                      <Textarea
                        name="remarks"
                        value={formState.remarks}
                        onChange={handleInputChange}
                        className="min-h-[80px] border-gray-200 focus-visible:ring-indigo-400"
                        placeholder="Add any payment remarks here..."
                      />
                    </motion.div>
                  </div>
                  
                  <div className="border-t border-dashed border-gray-200 pt-6 mt-6">
                    <h3 className="font-medium text-lg mb-4 text-gray-800">Payment Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 bg-gray-50 p-4 rounded-lg">
                      <motion.div variants={item} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">GROSS AMOUNT:</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {currencySymbol}
                          </span>
                          <Input
                            name="grossAmount"
                            value={formState.grossAmount.toString()}
                            onChange={handleInputChange}
                            type="number"
                            className="bg-white border-gray-200 pl-8"
                            readOnly
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div variants={item} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">DISCOUNT:</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {currencySymbol}
                          </span>
                          <Input
                            name="discount"
                            value={formState.discount.toString()}
                            onChange={handleInputChange}
                            type="number"
                            className="bg-white border-gray-200 pl-8"
                            readOnly
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div variants={item} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">NET AMOUNT:</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-600 font-bold">
                            {currencySymbol}
                          </span>
                          <Input
                            name="netAmount"
                            value={formState.netAmount.toString()}
                            onChange={handleInputChange}
                            type="number"
                            className="bg-indigo-50 border-indigo-100 font-bold text-indigo-800 pl-8"
                            readOnly
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div variants={item} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">TOTAL PAID:</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            {currencySymbol}
                          </span>
                          <Input
                            name="totalPaid"
                            value={formState.totalPaid.toString()}
                            onChange={handleInputChange}
                            type="number"
                            className="bg-white border-gray-200 pl-8"
                            readOnly
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div variants={item} className="flex flex-col">
                        <label className="text-sm font-medium mb-1 text-gray-700">BALANCE TO PAY:</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 font-bold">
                            {currencySymbol}
                          </span>
                          <Input
                            name="balanceToPay"
                            value={formState.balanceToPay.toString()}
                            onChange={handleInputChange}
                            type="number"
                            className="bg-amber-50 border-amber-100 font-bold text-amber-800 pl-8"
                            readOnly
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-teal-100">
                      <motion.div 
                        variants={item} 
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
                          <Banknote className="h-4 w-4 text-green-600" />
                          AMOUNT PAID:
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-green-600">
                            {currencySymbol}
                          </span>
                          <Input
                            name="amountPaid"
                            value={formState.amountPaid.toString()}
                            onChange={handleInputChange}
                            type="number"
                            className="border-green-200 focus-visible:ring-green-300 font-medium pl-8"
                          />
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        variants={item} 
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
                          <CalendarIcon className="h-4 w-4 text-teal-600" />
                          PAYMENT DATE:
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal border-teal-200 hover:bg-teal-50",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4 text-teal-500" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 z-50" align="start">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={handleDateSelect}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                      </motion.div>
                      
                      <motion.div 
                        variants={item} 
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
                          <CreditCard className="h-4 w-4 text-purple-600" />
                          PAYMENT METHOD:
                        </label>
                        <Select
                          value={formState.receivableAccount}
                          onValueChange={(value) => handleSelectChange("receivableAccount", value)}
                        >
                          <SelectTrigger className="border-purple-200 focus:ring-purple-300">
                            <SelectValue placeholder="Select payment method" />
                          </SelectTrigger>
                          <SelectContent className="bg-white z-50">
                            <SelectItem value="CASH_IN_HAND" className="cursor-pointer">CASH IN HAND</SelectItem>
                            <SelectItem value="BANK_TRANSFER" className="cursor-pointer">BANK TRANSFER</SelectItem>
                            <SelectItem value="CREDIT_CARD" className="cursor-pointer">CREDIT CARD</SelectItem>
                            <SelectItem value="CHEQUE" className="cursor-pointer">CHEQUE</SelectItem>
                            <SelectItem value="MOBILE_MONEY" className="cursor-pointer">MOBILE MONEY</SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="flex justify-between"
          >
            <Button 
              variant="outline" 
              onClick={() => navigate("/accounts/payments")}
              className="border-gray-300"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!formState.invoiceNumber || formState.amountPaid <= 0 || !formState.country || !formState.currency}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors"
            >
              Save Payment
            </Button>
          </motion.div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default AddInvoicePayment;
