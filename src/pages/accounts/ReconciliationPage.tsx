
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { 
  ArrowLeft, 
  Calculator, 
  Check, 
  DollarSign, 
  FileText, 
  Filter, 
  RefreshCw, 
  Save, 
  Search, 
  Upload,
  Download
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import FormActions from "@/pages/bill-of-lading/components/FormActions";

interface BankTransaction {
  id: string;
  date: string;
  description: string;
  reference: string;
  amount: number;
  matched: boolean;
}

interface InvoicePayment {
  id: string;
  invoiceNumber: string;
  customer: string;
  paymentDate: string;
  amount: number;
  matched: boolean;
}

const mockBankTransactions: BankTransaction[] = [
  { id: "T1001", date: "2023-07-05", description: "Payment from Global Shipping Co.", reference: "GLBL238721", amount: 4750.00, matched: true },
  { id: "T1002", date: "2023-07-05", description: "Payment from TransWorld Logistics", reference: "TW98324", amount: 2340.00, matched: true },
  { id: "T1003", date: "2023-07-05", description: "Payment from East-West Freights", reference: "EW521876", amount: 3815.00, matched: true },
  { id: "T1004", date: "2023-07-12", description: "Payment from Cross Seas Transport", reference: "CST672534", amount: 6300.00, matched: true },
  { id: "T1005", date: "2023-07-15", description: "Payment from Maritime Solutions", reference: "MS983451", amount: 5240.00, matched: false },
  { id: "T1006", date: "2023-07-18", description: "Payment from Oceanic Lines", reference: "OL127634", amount: 3620.00, matched: false },
];

const mockInvoicePayments: InvoicePayment[] = [
  { id: "P1001", invoiceNumber: "INV-2023-001", customer: "Global Shipping Co.", paymentDate: "2023-07-02", amount: 4750.00, matched: true },
  { id: "P1002", invoiceNumber: "INV-2023-002", customer: "TransWorld Logistics", paymentDate: "2023-07-03", amount: 2340.00, matched: true },
  { id: "P1003", invoiceNumber: "INV-2023-004", customer: "East-West Freights", paymentDate: "2023-07-02", amount: 3840.00, matched: true },
  { id: "P1004", invoiceNumber: "INV-2023-005", customer: "Cross Seas Transport", paymentDate: "2023-07-10", amount: 6150.00, matched: true },
  { id: "P1005", invoiceNumber: "INV-2023-006", customer: "Maritime Solutions", paymentDate: "2023-07-14", amount: 5240.00, matched: false },
  { id: "P1006", invoiceNumber: "INV-2023-007", customer: "Oceanic Lines", paymentDate: "2023-07-16", amount: 3620.00, matched: false },
];

const ReconciliationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isNewMode = location.search.includes('mode=new');
  
  const [startDate, setStartDate] = useState<Date | undefined>(new Date("2023-07-01"));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date("2023-07-31"));
  const [reconciliationStatus, setReconciliationStatus] = useState<"all" | "matched" | "unmatched">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("overview");

  // State for bank transactions and invoice payments
  const [bankTransactions, setBankTransactions] = useState<BankTransaction[]>(mockBankTransactions);
  const [invoicePayments, setInvoicePayments] = useState<InvoicePayment[]>(mockInvoicePayments);
  
  // Selected records for manual matching
  const [selectedBankTransaction, setSelectedBankTransaction] = useState<string | null>(null);
  const [selectedInvoicePayment, setSelectedInvoicePayment] = useState<string | null>(null);

  // Calculate reconciliation statistics
  const totalBankTransactions = bankTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalInvoicePayments = invoicePayments.reduce((sum, p) => sum + p.amount, 0);
  const matchedBankTransactions = bankTransactions.filter(t => t.matched).reduce((sum, t) => sum + t.amount, 0);
  const matchedInvoicePayments = invoicePayments.filter(p => p.matched).reduce((sum, p) => sum + p.amount, 0);
  const unmatchedBankTransactions = totalBankTransactions - matchedBankTransactions;
  const unmatchedInvoicePayments = totalInvoicePayments - matchedInvoicePayments;
  const varianceAmount = totalBankTransactions - totalInvoicePayments;

  // Filter transactions based on search and status
  const filteredBankTransactions = bankTransactions.filter(t => {
    const matchesSearch = 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      reconciliationStatus === "all" || 
      (reconciliationStatus === "matched" && t.matched) ||
      (reconciliationStatus === "unmatched" && !t.matched);
    
    return matchesSearch && matchesStatus;
  });

  const filteredInvoicePayments = invoicePayments.filter(p => {
    const matchesSearch = 
      p.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      reconciliationStatus === "all" || 
      (reconciliationStatus === "matched" && p.matched) ||
      (reconciliationStatus === "unmatched" && !p.matched);
    
    return matchesSearch && matchesStatus;
  });

  // Handle manual reconciliation matching
  const handleMatchRecords = () => {
    if (!selectedBankTransaction || !selectedInvoicePayment) {
      toast({
        title: "Match Error",
        description: "Please select both a bank transaction and an invoice payment to match.",
        variant: "destructive"
      });
      return;
    }

    // Find selected records
    const bankTransaction = bankTransactions.find(t => t.id === selectedBankTransaction);
    const invoicePayment = invoicePayments.find(p => p.id === selectedInvoicePayment);

    if (!bankTransaction || !invoicePayment) return;

    // Check if already matched
    if (bankTransaction.matched || invoicePayment.matched) {
      toast({
        title: "Already Matched",
        description: "One or both records are already matched to another record.",
        variant: "destructive"
      });
      return;
    }

    // Calculate variance
    const variance = bankTransaction.amount - invoicePayment.amount;
    const varianceAbsolute = Math.abs(variance);

    // Update matching status
    const updatedBankTransactions = bankTransactions.map(t => 
      t.id === selectedBankTransaction ? { ...t, matched: true } : t
    );
    
    const updatedInvoicePayments = invoicePayments.map(p => 
      p.id === selectedInvoicePayment ? { ...p, matched: true } : p
    );

    setBankTransactions(updatedBankTransactions);
    setInvoicePayments(updatedInvoicePayments);
    
    // Reset selections
    setSelectedBankTransaction(null);
    setSelectedInvoicePayment(null);

    // Show success toast with variance info
    if (varianceAbsolute === 0) {
      toast({
        title: "Reconciliation Successful",
        description: "Records matched perfectly with no variance.",
      });
    } else {
      toast({
        title: "Reconciliation with Variance",
        description: `Records matched with a variance of ${variance > 0 ? '+' : ''}$${variance.toFixed(2)}.`,
      });
    }
  };

  // Auto-match function
  const handleAutoMatch = () => {
    // For this demo, we'll match based on exact amount and unmatched status
    let matchCount = 0;
    const newBankTransactions = [...bankTransactions];
    const newInvoicePayments = [...invoicePayments];
    
    // Simple auto-matching algorithm for demo purposes
    for (let i = 0; i < newBankTransactions.length; i++) {
      if (newBankTransactions[i].matched) continue;
      
      for (let j = 0; j < newInvoicePayments.length; j++) {
        if (newInvoicePayments[j].matched) continue;
        
        // Match if amounts are equal or very close (within $1)
        if (Math.abs(newBankTransactions[i].amount - newInvoicePayments[j].amount) <= 1) {
          newBankTransactions[i].matched = true;
          newInvoicePayments[j].matched = true;
          matchCount++;
          break;
        }
      }
    }
    
    setBankTransactions(newBankTransactions);
    setInvoicePayments(newInvoicePayments);
    
    toast({
      title: "Auto-match Complete",
      description: `Successfully matched ${matchCount} new pairs of records.`,
    });
  };

  const handleSaveReconciliation = () => {
    // In a real application, this would save to backend
    toast({
      title: "Reconciliation Saved",
      description: "Your reconciliation has been successfully saved.",
    });
    
    // Navigate back to the accounting panel
    navigate("/accounts/reconciliation");
  };

  const handleExportReport = () => {
    toast({
      title: "Report Exported",
      description: "Reconciliation report has been exported to Excel.",
    });
  };

  return (
    <Layout title="Payment Reconciliation">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Payment Reconciliation
              </CardTitle>
              <CardDescription>
                Match accounting records with bank transactions for period
                {startDate && endDate && (
                  <span className="font-medium ml-1">
                    {format(startDate, "MMM d, yyyy")} - {format(endDate, "MMM d, yyyy")}
                  </span>
                )}
              </CardDescription>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/accounts/payment-methods')}
              className="flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Accounting
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-blue-700">Bank Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-blue-700">${totalBankTransactions.toFixed(2)}</div>
                <div className="text-xs text-blue-600 flex justify-between mt-1">
                  <span>Matched: ${matchedBankTransactions.toFixed(2)}</span>
                  <span>Unmatched: ${unmatchedBankTransactions.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-purple-700">Invoice Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-purple-700">${totalInvoicePayments.toFixed(2)}</div>
                <div className="text-xs text-purple-600 flex justify-between mt-1">
                  <span>Matched: ${matchedInvoicePayments.toFixed(2)}</span>
                  <span>Unmatched: ${unmatchedInvoicePayments.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`${Math.abs(varianceAmount) < 0.01 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
              <CardHeader className="pb-2">
                <CardTitle className={`text-sm font-medium ${Math.abs(varianceAmount) < 0.01 ? 'text-green-700' : 'text-amber-700'}`}>
                  Variance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-xl font-bold ${Math.abs(varianceAmount) < 0.01 ? 'text-green-700' : 'text-amber-700'}`}>
                  {varianceAmount === 0 
                    ? '$0.00' 
                    : `${varianceAmount > 0 ? '+' : ''}$${varianceAmount.toFixed(2)}`}
                </div>
                <div className={`text-xs ${Math.abs(varianceAmount) < 0.01 ? 'text-green-600' : 'text-amber-600'} mt-1`}>
                  {Math.abs(varianceAmount) < 0.01 
                    ? 'Perfectly balanced' 
                    : 'Requires investigation'}
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-green-700">Reconciliation Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-green-700">
                  {Math.round((matchedBankTransactions / totalBankTransactions) * 100)}%
                </div>
                <div className="text-xs text-green-600 mt-1">
                  {bankTransactions.filter(t => t.matched).length} of {bankTransactions.length} transactions matched
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 space-y-2">
              <Label htmlFor="date-range">Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left">
                      {startDate ? format(startDate, "MMM d, yyyy") : "Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left">
                      {endDate ? format(endDate, "MMM d, yyyy") : "End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <Label>Status Filter</Label>
              <Select 
                value={reconciliationStatus} 
                onValueChange={(value) => setReconciliationStatus(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Records</SelectItem>
                  <SelectItem value="matched">Matched Only</SelectItem>
                  <SelectItem value="unmatched">Unmatched Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 space-y-2">
              <Label htmlFor="search">Search Records</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by description, reference, or invoice..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant="default" 
              className="bg-blue-600 hover:bg-blue-700" 
              onClick={handleAutoMatch}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Auto-Match Records
            </Button>
            <Button variant="outline" onClick={() => setSearchTerm("")}>
              <Filter className="mr-2 h-4 w-4" /> Clear Filters
            </Button>
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bank-transactions">Bank Transactions</TabsTrigger>
              <TabsTrigger value="invoice-payments">Invoice Payments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Bank Transactions</h3>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="w-10"></TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredBankTransactions.slice(0, 5).map((transaction) => (
                          <TableRow 
                            key={transaction.id}
                            className={`${
                              selectedBankTransaction === transaction.id ? 'bg-blue-50' : ''
                            } ${transaction.matched ? 'bg-green-50' : ''}`}
                            onClick={() => !transaction.matched && setSelectedBankTransaction(
                              selectedBankTransaction === transaction.id ? null : transaction.id
                            )}
                          >
                            <TableCell>
                              <input 
                                type="radio" 
                                checked={selectedBankTransaction === transaction.id}
                                onChange={() => {}}
                                disabled={transaction.matched}
                                className="h-4 w-4 rounded-full border-gray-300"
                              />
                            </TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={transaction.description}>
                              {transaction.description}
                            </TableCell>
                            <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-center">
                              {transaction.matched ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                  <Check className="h-3 w-3" /> Matched
                                </span>
                              ) : (
                                <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Unmatched</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredBankTransactions.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                              No bank transactions found matching your criteria
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {filteredBankTransactions.length > 5 && (
                    <div className="text-center mt-2">
                      <Button 
                        variant="link" 
                        onClick={() => setSelectedTab("bank-transactions")}
                      >
                        View all {filteredBankTransactions.length} transactions
                      </Button>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Invoice Payments</h3>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-slate-50">
                          <TableHead className="w-10"></TableHead>
                          <TableHead>Invoice #</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredInvoicePayments.slice(0, 5).map((payment) => (
                          <TableRow 
                            key={payment.id}
                            className={`${
                              selectedInvoicePayment === payment.id ? 'bg-purple-50' : ''
                            } ${payment.matched ? 'bg-green-50' : ''}`}
                            onClick={() => !payment.matched && setSelectedInvoicePayment(
                              selectedInvoicePayment === payment.id ? null : payment.id
                            )}
                          >
                            <TableCell>
                              <input 
                                type="radio" 
                                checked={selectedInvoicePayment === payment.id}
                                onChange={() => {}}
                                disabled={payment.matched}
                                className="h-4 w-4 rounded-full border-gray-300"
                              />
                            </TableCell>
                            <TableCell>{payment.invoiceNumber}</TableCell>
                            <TableCell className="max-w-[200px] truncate" title={payment.customer}>
                              {payment.customer}
                            </TableCell>
                            <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-center">
                              {payment.matched ? (
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                  <Check className="h-3 w-3" /> Matched
                                </span>
                              ) : (
                                <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Unmatched</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredInvoicePayments.length === 0 && (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-4">
                              No invoice payments found matching your criteria
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  {filteredInvoicePayments.length > 5 && (
                    <div className="text-center mt-2">
                      <Button 
                        variant="link" 
                        onClick={() => setSelectedTab("invoice-payments")}
                      >
                        View all {filteredInvoicePayments.length} payments
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-md mt-6 border">
                <h3 className="text-lg font-medium mb-2">Manual Reconciliation</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  Select one bank transaction and one invoice payment, then click "Match Records" to reconcile them.
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Selected Bank Transaction</Label>
                    <div className="h-20 p-3 border rounded-md bg-white">
                      {selectedBankTransaction ? (
                        (() => {
                          const transaction = bankTransactions.find(t => t.id === selectedBankTransaction);
                          return transaction ? (
                            <div>
                              <div className="font-medium">{transaction.description}</div>
                              <div className="text-sm text-muted-foreground">Ref: {transaction.reference}</div>
                              <div className="text-sm font-semibold mt-1">${transaction.amount.toFixed(2)}</div>
                            </div>
                          ) : null;
                        })()
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          No bank transaction selected
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label>Selected Invoice Payment</Label>
                    <div className="h-20 p-3 border rounded-md bg-white">
                      {selectedInvoicePayment ? (
                        (() => {
                          const payment = invoicePayments.find(p => p.id === selectedInvoicePayment);
                          return payment ? (
                            <div>
                              <div className="font-medium">{payment.invoiceNumber}</div>
                              <div className="text-sm text-muted-foreground">{payment.customer}</div>
                              <div className="text-sm font-semibold mt-1">${payment.amount.toFixed(2)}</div>
                            </div>
                          ) : null;
                        })()
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          No invoice payment selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    onClick={handleMatchRecords}
                    disabled={!selectedBankTransaction || !selectedInvoicePayment}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    Match Records
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bank-transactions">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBankTransactions.map((transaction) => (
                      <motion.tr 
                        key={transaction.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`${
                          selectedBankTransaction === transaction.id ? 'bg-blue-50' : ''
                        } ${transaction.matched ? 'bg-green-50' : ''}`}
                        onClick={() => !transaction.matched && setSelectedBankTransaction(
                          selectedBankTransaction === transaction.id ? null : transaction.id
                        )}
                      >
                        <TableCell>
                          <input 
                            type="radio" 
                            checked={selectedBankTransaction === transaction.id}
                            onChange={() => {}}
                            disabled={transaction.matched}
                            className="h-4 w-4 rounded-full border-gray-300"
                          />
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.reference}</TableCell>
                        <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          {transaction.matched ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              <Check className="h-3 w-3" /> Matched
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Unmatched</span>
                          )}
                        </TableCell>
                      </motion.tr>
                    ))}
                    {filteredBankTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No bank transactions found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="invoice-payments">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInvoicePayments.map((payment) => (
                      <motion.tr 
                        key={payment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className={`${
                          selectedInvoicePayment === payment.id ? 'bg-purple-50' : ''
                        } ${payment.matched ? 'bg-green-50' : ''}`}
                        onClick={() => !payment.matched && setSelectedInvoicePayment(
                          selectedInvoicePayment === payment.id ? null : payment.id
                        )}
                      >
                        <TableCell>
                          <input 
                            type="radio" 
                            checked={selectedInvoicePayment === payment.id}
                            onChange={() => {}}
                            disabled={payment.matched}
                            className="h-4 w-4 rounded-full border-gray-300"
                          />
                        </TableCell>
                        <TableCell>{payment.invoiceNumber}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{payment.paymentDate}</TableCell>
                        <TableCell className="font-medium">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
                          {payment.matched ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              <Check className="h-3 w-3" /> Matched
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Unmatched</span>
                          )}
                        </TableCell>
                      </motion.tr>
                    ))}
                    {filteredInvoicePayments.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No invoice payments found matching your criteria
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button 
              variant="default"
              onClick={handleSaveReconciliation}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Reconciliation
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate("/accounts/payment-methods")}
            >
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default ReconciliationPage;
