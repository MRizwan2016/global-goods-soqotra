import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

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
  
  // Set active tab based on reconciliation status
  const [activeTab, setActiveTab] = useState<string>("unreconciled");
  
  // Count for each category
  const unreconciledCount = payments.filter(p => !p.reconciled).length;
  const reconciledCount = payments.filter(p => p.reconciled).length;
  
  useEffect(() => {
    loadPayments();
  }, []);
  
  useEffect(() => {
    // Filter payments based on search term and tab
    filterPayments();
  }, [searchTerm, payments, activeTab, invoiceFilter]);
  
  const loadPayments = () => {
    try {
      const paymentsStr = localStorage.getItem('payments');
      if (paymentsStr) {
        const loadedPayments = JSON.parse(paymentsStr);
        setPayments(loadedPayments);
        
        // If there's an invoice filter in the URL, switch to showing all payments
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
    
    // First apply tab filter
    if (activeTab === "unreconciled") {
      filtered = filtered.filter(payment => !payment.reconciled);
    } else if (activeTab === "reconciled") {
      filtered = filtered.filter(payment => payment.reconciled);
    }
    
    // Then apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(payment => 
        payment.invoiceNumber.toLowerCase().includes(term) ||
        payment.receiptNumber.toLowerCase().includes(term) ||
        payment.customerName.toLowerCase().includes(term)
      );
    }
    
    // Then apply invoice filter from URL if present
    if (invoiceFilter) {
      filtered = filtered.filter(payment => 
        payment.invoiceNumber === invoiceFilter
      );
    }
    
    // Sort by timestamp descending (newest first)
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
      // If all are selected, unselect all
      setSelectedPayments([]);
    } else {
      // Otherwise, select all
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
    
    // Update payments with reconciled info
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
    
    // Save back to localStorage
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
    
    // Update state
    setPayments(updatedPayments);
    setSelectedPayments([]);
    
    // Show success message
    toast.success("Payments Reconciled", {
      description: `${selectedPayments.length} payment(s) have been marked as reconciled`
    });
    
    // Refresh to update the UI
    filterPayments();
  };
  
  const handlePrint = () => {
    if (selectedPayments.length === 0) {
      toast.warning("No payments selected", {
        description: "Please select at least one payment to print"
      });
      return;
    }
    
    // In a real app, you would generate a printable report here
    toast.info("Printing Payments", {
      description: `Preparing ${selectedPayments.length} payment(s) for printing`
    });
    
    // For demo purposes, just show what would be printed
    const selectedPaymentData = payments.filter(p => selectedPayments.includes(p.id));
    console.log("Printing payments:", selectedPaymentData);
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
          {/* Header Controls */}
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
          
          {/* Tabs */}
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
            
            {/* Common table content for all tabs */}
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
      
      {/* Reconciliation Reminder */}
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
    </Layout>
  );
  
  // Helper function to render the payments table
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
