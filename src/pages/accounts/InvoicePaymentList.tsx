
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Download, Filter, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock payment data
const mockPayments = [
  {
    id: "pay-001",
    invoiceNumber: "INV20240001",
    paymentDate: "2024-03-15",
    customer: "John Smith",
    country: "Qatar",
    amount: 1250.00,
    paymentMethod: "Credit Card",
    reference: "TXN-12345",
    status: "completed"
  },
  {
    id: "pay-002",
    invoiceNumber: "INV20240015",
    paymentDate: "2024-03-14",
    customer: "Jane Doe",
    country: "Sri Lanka",
    amount: 750.50,
    paymentMethod: "Bank Transfer",
    reference: "BT-98765",
    status: "completed"
  },
  {
    id: "pay-003",
    invoiceNumber: "INV20240022",
    paymentDate: "2024-03-13",
    customer: "Ali Mohammed",
    country: "United Arab Emirates",
    amount: 2300.00,
    paymentMethod: "Cash",
    reference: "",
    status: "completed"
  },
  {
    id: "pay-004",
    invoiceNumber: "INV20240030",
    paymentDate: "2024-03-12",
    customer: "Maria Garcia",
    country: "Philippines",
    amount: 980.25,
    paymentMethod: "Mobile Payment",
    reference: "MP-45678",
    status: "pending"
  },
  {
    id: "pay-005",
    invoiceNumber: "INV20240035",
    paymentDate: "2024-03-11",
    customer: "Robert Chen",
    country: "Kenya",
    amount: 1750.00,
    paymentMethod: "Check",
    reference: "CHK-12345",
    status: "completed"
  }
];

const InvoicePaymentList = () => {
  const [searchText, setSearchText] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const navigate = useNavigate();

  // Get unique countries from payment data
  const countries = Array.from(new Set(mockPayments.map(payment => payment.country)));

  // Filter and sort payments
  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                         payment.customer.toLowerCase().includes(searchText.toLowerCase()) ||
                         payment.reference.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesPaymentMethod = paymentMethod === "all" || payment.paymentMethod.toLowerCase() === paymentMethod.toLowerCase();
    const matchesCountry = country === "all" || payment.country === country;
    const matchesStatus = status === "all" || payment.status === status;
    
    return matchesSearch && matchesPaymentMethod && matchesCountry && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc" 
        ? new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime()
        : new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime();
    } else if (sortBy === "amount") {
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    }
    return 0;
  });

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout title="Invoice Payments">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoice Payments</h1>
          <Button onClick={() => navigate("/accounts/add-payment")}>
            <Plus className="mr-2 h-4 w-4" /> New Payment
          </Button>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Payment Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Search by invoice or customer..."
                    className="pl-9"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Payment Method</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Methods</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="credit card">Credit Card</SelectItem>
                    <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="mobile payment">Mobile Payment</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Country</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-[180px]">
                    <div className="flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Status</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" className="ml-auto">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          setSortBy("amount");
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        }}
                      >
                        Amount
                        {sortBy === "amount" && (
                          <span className="ml-1">
                            {sortOrder === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length > 0 ? (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                          <TableCell>{formatDate(payment.paymentDate)}</TableCell>
                          <TableCell>{payment.customer}</TableCell>
                          <TableCell>{payment.country}</TableCell>
                          <TableCell>{payment.paymentMethod}</TableCell>
                          <TableCell>{payment.reference || "-"}</TableCell>
                          <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            {payment.status === "completed" ? (
                              <Badge className="bg-green-100 text-green-800">Completed</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                Pending
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-6 text-gray-500">
                          No payment records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {filteredPayments.length} of {mockPayments.length} payments
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" disabled>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default InvoicePaymentList;
