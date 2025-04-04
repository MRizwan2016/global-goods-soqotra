import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  CheckCircle2, 
  Search, 
  FileText, 
  Filter, 
  Printer, 
  RefreshCcw, 
  Clock,
  DollarSign,
  Calendar,
  AlertTriangle,
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { COUNTRY_CURRENCY_MAP, DEFAULT_COUNTRY } from "../payment/constants/paymentConstants";
import DigitalCalculator from "@/components/calculator/DigitalCalculator";

interface Payment {
  id: string;
  receiptNumber: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  currency: string;
  country: string;
  date: string;
  paymentMethod: string;
  timestamp: string;
  reconciled?: boolean;
  reconciledAt?: string;
  reconciledBy?: string;
  remarks?: string;
}

const ReconciliationPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const invoiceFilter = searchParams.get('invoice');
  
  const [activeTab, setActiveTab] = useState<string>("unreconciled");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  
  const countries = Object.keys(COUNTRY_CURRENCY_MAP);
  
  const unreconciledCount = payments.filter(p => !p.reconciled).length;
  const reconciledCount = payments.filter(p => p.reconciled).length;
  
  const paymentsByCountry = countries.reduce((acc, country) => {
    acc[country] = payments.filter(p => p.country === country).length;
    return acc;
  }, {} as Record<string, number>);
  
  useEffect(() => {
    loadPayments();
  }, []);
  
  useEffect(() => {
    filterPayments();
  }, [searchTerm, payments, activeTab, invoiceFilter, countryFilter]);
  
  const loadPayments = () => {
    try {
      const paymentsStr = localStorage.getItem('payments');
      if (paymentsStr) {
        const loadedPayments = JSON.parse(paymentsStr);
        const updatedPayments = loadedPayments.map((payment: any) => ({
          ...payment,
          country: payment.country || DEFAULT_COUNTRY,
          currency: payment.currency || "QAR"
        }));
        setPayments(updatedPayments);
        
        if (invoiceFilter) {
          setActiveTab("all");
        }
      }
    } catch (error) {
      console.error("Error loading payments:", error);
      toast.error("Could not load payment data");
    }
  };
  
  const filterPayments = () => {
    let filtered = [...payments];
    
    if (activeTab === "unreconciled") {
      filtered = filtered.filter(payment => !payment.reconciled);
    } else if (activeTab === "reconciled") {
      filtered = filtered.filter(payment => payment.reconciled);
    }
    
    if (countryFilter !== "all") {
      filtered = filtered.filter(payment => payment.country === countryFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(payment => 
        payment.invoiceNumber.toLowerCase().includes(term) ||
        payment.receiptNumber.toLowerCase().includes(term) ||
        payment.customerName.toLowerCase().includes(term)
      );
    }
    
    if (invoiceFilter) {
      filtered = filtered.filter(payment => 
        payment.invoiceNumber === invoiceFilter
      );
    }
    
    filtered.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    setFilteredPayments(filtered);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCheckboxChange = (paymentId: string) => {
    setSelectedPayments(prev => {
      if (prev.includes(paymentId)) {
        return prev.filter(id => id !== paymentId);
      } else {
        return [...prev, paymentId];
      }
    });
  };
  
  const handleSelectAll = () => {
    if (selectedPayments.length === filteredPayments.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(filteredPayments.map(p => p.id));
    }
  };
  
  const handleReconcile = () => {
    if (selectedPayments.length === 0) {
      toast.warning("No payments selected", {
        description: "Please select at least one payment to reconcile"
      });
      return;
    }
    
    const updatedPayments = payments.map(payment => {
      if (selectedPayments.includes(payment.id)) {
        return {
          ...payment,
          reconciled: true,
          reconciledAt: new Date().toISOString(),
          reconciledBy: "System Administrator"
        };
      }
      return payment;
    });
    
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
    
    setPayments(updatedPayments);
    setSelectedPayments([]);
    
    toast.success("Payments Reconciled", {
      description: `${selectedPayments.length} payment(s) have been marked as reconciled`
    });
    
    filterPayments();
  };
  
  const handlePrint = () => {
    if (selectedPayments.length === 0) {
      toast.warning("No payments selected", {
        description: "Please select at least one payment to print"
      });
      return;
    }
    
    toast.info("Printing Payments", {
      description: `Preparing ${selectedPayments.length} payment(s) for printing`
    });
    
    const selectedPaymentData = payments.filter(p => selectedPayments.includes(p.id));
    console.log("Printing payments:", selectedPaymentData);
  };
  
  const handleCountryFilterChange = (value: string) => {
    setCountryFilter(value);
    setSelectedPayments([]);
  };

  return (
    <Layout title="Payment Reconciliation">
      <Card className="border-t-4 border-t-blue-600">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                Payment Reconciliation
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage and reconcile payment records
              </CardDescription>
            </div>
            <div className="bg-white p-3 rounded-full shadow-sm">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <div className="flex items-center w-full md:w-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by invoice or customer..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10 w-full md:w-80"
              />
            </div>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2 min-w-[180px]">
                <Globe className="h-4 w-4 text-gray-500" />
                <Select value={countryFilter} onValueChange={handleCountryFilterChange}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>
                        {country} ({paymentsByCountry[country] || 0})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                <span>Print Selected</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={loadPayments}>
                <RefreshCcw className="h-4 w-4" />
                <span>Refresh</span>
              </Button>
              
              <Button variant="default" size="sm" className="flex items-center gap-1" onClick={handleReconcile}>
                <CheckCircle2 className="h-4 w-4" />
                <span>Reconcile Selected</span>
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="unreconciled" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Unreconciled</span>
                <span className="ml-2 bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {unreconciledCount}
                </span>
              </TabsTrigger>
              
              <TabsTrigger value="reconciled" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Reconciled</span>
                <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {reconciledCount}
                </span>
              </TabsTrigger>
              
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>All Payments</span>
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                  {payments.length}
                </span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="unreconciled">
              {renderPaymentsTable(filteredPayments, "No unreconciled payments found")}
            </TabsContent>
            
            <TabsContent value="reconciled">
              {renderPaymentsTable(filteredPayments, "No reconciled payments found")}
            </TabsContent>
            
            <TabsContent value="all">
              {renderPaymentsTable(filteredPayments, "No payments found")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {countries.map(country => {
          const countryCount = payments.filter(p => p.country === country).length;
          const reconciled = payments.filter(p => p.country === country && p.reconciled).length;
          const unreconciled = countryCount - reconciled;
          const currency = COUNTRY_CURRENCY_MAP[country]?.[0] || "QAR";
          
          return (
            <Card key={country} className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">{country}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{countryCount}</p>
                    <p className="text-xs text-gray-500">Currency: {currency}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-green-600 flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {reconciled} Reconciled
                    </p>
                    <p className="text-xs text-amber-600 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {unreconciled} Pending
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {unreconciledCount >= 10 && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-amber-800">Reconciliation Reminder</h3>
            <p className="text-amber-700 text-sm mt-1">
              You have {unreconciledCount} unreconciled payments. It's recommended to reconcile
              them for accurate financial reporting.
            </p>
          </div>
        </div>
      )}
      
      <DigitalCalculator />
    </Layout>
  );
  
  function renderPaymentsTable(payments: Payment[], emptyMessage: string) {
    if (payments.length === 0) {
      return (
        <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">{emptyMessage}</h3>
          <p className="text-gray-500 mt-2">
            {invoiceFilter ? "Try removing the invoice filter or " : ""}
            Try a different search term or tab.
          </p>
        </div>
      );
    }
  
    return (
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-3 text-left">
                  <div className="flex items-center">
                    <Checkbox
                      checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </div>
                </th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Receipt #</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => {
                const currencySymbol = payment.currency === "USD" ? "$" :
                                      payment.currency === "EUR" ? "€" :
                                      payment.currency === "QAR" ? "QR" :
                                      payment.currency === "AED" ? "AED" :
                                      payment.currency === "KES" ? "KSh" :
                                      payment.currency === "INR" ? "₹" :
                                      payment.currency === "LKR" ? "Rs" : 
                                      payment.currency;
                
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Checkbox
                          checked={selectedPayments.includes(payment.id)}
                          onCheckedChange={() => handleCheckboxChange(payment.id)}
                          aria-label={`Select payment ${payment.receiptNumber}`}
                        />
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {payment.receiptNumber}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-800">
                      {payment.invoiceNumber}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                      {payment.customerName}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {currencySymbol} {typeof payment.amount === 'number' ? payment.amount.toFixed(2) : payment.amount}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        {payment.country || "Qatar"}
                      </span>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {payment.reconciled ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Reconciled
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                          Pending
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export default ReconciliationPage;
