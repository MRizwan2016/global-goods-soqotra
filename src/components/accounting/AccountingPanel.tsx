import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CreditCard, 
  Receipt, 
  Calculator, 
  DollarSign, 
  Calendar,
  User,
  Building,
  FileText,
  LineChart,
  Check,
  Search,
  ArrowUpDown,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const AccountingPanel = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const handleViewReconciliation = () => {
    navigate("/accounts/reconciliation");
  };
  
  const handleNewReconciliation = () => {
    navigate("/accounts/reconciliation?mode=new");
    toast({
      title: "New Reconciliation",
      description: "Started a new reconciliation process.",
    });
  };
  
  const handleViewProfitLoss = () => {
    navigate("/accounts/profit-loss");
  };
  
  const toggleSort = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };
  
  const reconciliationData = [
    {
      id: "REC-2023-001",
      invoiceNumber: "INV-2023-001",
      customer: "Global Shipping Co.",
      amount: 4750.00,
      paymentDate: "2023-06-12",
      bankingDate: "2023-06-15",
      status: "Reconciled",
      difference: 0,
    },
    {
      id: "REC-2023-002",
      invoiceNumber: "INV-2023-002",
      customer: "TransWorld Logistics",
      amount: 2340.00,
      paymentDate: "2023-06-18",
      bankingDate: "2023-06-20",
      status: "Reconciled",
      difference: 0,
    },
    {
      id: "REC-2023-003",
      invoiceNumber: "INV-2023-003",
      customer: "Premium Cargo Ltd.",
      amount: 5120.00,
      paymentDate: "2023-06-25",
      bankingDate: "Pending",
      status: "Pending",
      difference: null,
    },
    {
      id: "REC-2023-004",
      invoiceNumber: "INV-2023-004",
      customer: "East-West Freights",
      amount: 3840.00,
      paymentDate: "2023-07-02",
      bankingDate: "2023-07-05",
      status: "Reconciled",
      difference: -25.00,
    },
    {
      id: "REC-2023-005",
      invoiceNumber: "INV-2023-005",
      customer: "Cross Seas Transport",
      amount: 6150.00,
      paymentDate: "2023-07-10",
      bankingDate: "2023-07-12",
      status: "Variance",
      difference: 150.00,
    }
  ];

  // Filter by search term
  const filteredReconciliations = reconciliationData.filter(rec => 
    rec.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort by payment date
  const sortedReconciliations = [...filteredReconciliations].sort((a, b) => {
    if (a.paymentDate === "Pending") return 1;
    if (b.paymentDate === "Pending") return -1;
    
    const dateA = new Date(a.paymentDate);
    const dateB = new Date(b.paymentDate);
    
    return sortDirection === "asc" 
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Financial Management
        </CardTitle>
        <CardDescription>
          Manage financial accounts, reconciliation, and profit/loss tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="payment-methods" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="payment-methods" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment Methods</span>
            </TabsTrigger>
            <TabsTrigger value="reconciliation" className="flex items-center gap-1">
              <Receipt className="h-4 w-4" />
              <span className="hidden sm:inline">Reconciliation</span>
            </TabsTrigger>
            <TabsTrigger value="profit-loss" className="flex items-center gap-1">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Profit & Loss</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-1">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Reports</span>
            </TabsTrigger>
          </TabsList>

          {/* Payment Methods Tab */}
          <TabsContent value="payment-methods" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <Button size="sm" className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Method Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Bank Transfer</TableCell>
                  <TableCell>Bank</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
                  </TableCell>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cash</TableCell>
                  <TableCell>Cash</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
                  </TableCell>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Credit Card</TableCell>
                  <TableCell>Card</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Active</span>
                  </TableCell>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          {/* Reconciliation Tab - Enhanced */}
          <TabsContent value="reconciliation" className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-lg font-medium">Payment Reconciliation</h3>
                <p className="text-sm text-muted-foreground">Match invoice payments with bank statements</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleViewReconciliation}>
                  <Search className="h-4 w-4" />
                  View All
                </Button>
                <Button size="sm" className="flex items-center gap-1" onClick={handleNewReconciliation}>
                  <Receipt className="h-4 w-4" />
                  New Reconciliation
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <Input 
                placeholder="Search by invoice number, customer, or status..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleSort} 
                title={`Sort by date ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-white rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Date</TableHead>
                    <TableHead>Banking Date</TableHead>
                    <TableHead>Difference</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedReconciliations.map((record, index) => (
                    <motion.tr
                      key={record.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{record.invoiceNumber}</TableCell>
                      <TableCell>{record.customer}</TableCell>
                      <TableCell>${record.amount.toFixed(2)}</TableCell>
                      <TableCell>{record.paymentDate}</TableCell>
                      <TableCell>{record.bankingDate}</TableCell>
                      <TableCell>
                        {record.difference === null ? (
                          '—'
                        ) : record.difference === 0 ? (
                          <span className="text-green-600 font-medium">$0.00</span>
                        ) : record.difference < 0 ? (
                          <span className="text-red-600 font-medium">-${Math.abs(record.difference).toFixed(2)}</span>
                        ) : (
                          <span className="text-blue-600 font-medium">+${record.difference.toFixed(2)}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {record.status === "Reconciled" ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 flex items-center gap-1 w-fit">
                            <Check className="h-3 w-3" />Reconciled
                          </span>
                        ) : record.status === "Pending" ? (
                          <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800 w-fit">Pending</span>
                        ) : (
                          <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800 w-fit">Variance</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleViewReconciliation}>
                          {record.status === "Reconciled" ? "View" : "Process"}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Profit & Loss Tab - Updated */}
          <TabsContent value="profit-loss" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Profit & Loss Analysis</h3>
                <p className="text-sm text-muted-foreground">Track revenue, expenses, and profitability by country</p>
              </div>
              <Button 
                size="sm" 
                className="flex items-center gap-1"
                onClick={handleViewProfitLoss}
              >
                <Calculator className="h-4 w-4" />
                View Full Report
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">$128,450.00</div>
                  <p className="text-xs text-muted-foreground mt-1">For current quarter</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">$86,320.00</div>
                  <p className="text-xs text-muted-foreground mt-1">For current quarter</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">$42,130.00</div>
                  <p className="text-xs text-muted-foreground mt-1">For current quarter</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Container Profitability</CardTitle>
                <CardDescription>Profit analysis after container loading</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Container #</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">CONT-2023-123</TableCell>
                      <TableCell>Dubai, UAE</TableCell>
                      <TableCell>$12,500.00</TableCell>
                      <TableCell>$8,750.00</TableCell>
                      <TableCell className="text-green-600 font-medium">$3,750.00</TableCell>
                      <TableCell>30%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CONT-2023-124</TableCell>
                      <TableCell>Muscat, Oman</TableCell>
                      <TableCell>$9,800.00</TableCell>
                      <TableCell>$7,350.00</TableCell>
                      <TableCell className="text-green-600 font-medium">$2,450.00</TableCell>
                      <TableCell>25%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CONT-2023-125</TableCell>
                      <TableCell>Nairobi, Kenya</TableCell>
                      <TableCell>$15,200.00</TableCell>
                      <TableCell>$12,900.00</TableCell>
                      <TableCell className="text-green-600 font-medium">$2,300.00</TableCell>
                      <TableCell>15%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Financial Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Financial Reports</h3>
              <Button size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Generate New Report
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Customer Financial Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between items-center">
                      <span>Customer Statement of Account</span>
                      <Button variant="outline" size="sm">Generate</Button>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between items-center">
                      <span>Outstanding Payments Report</span>
                      <Button variant="outline" size="sm">Generate</Button>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between items-center">
                      <span>Customer Transaction History</span>
                      <Button variant="outline" size="sm">Generate</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Company Financial Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between items-center">
                      <span>Balance Sheet</span>
                      <Button variant="outline" size="sm">Generate</Button>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between items-center">
                      <span>Income Statement</span>
                      <Button variant="outline" size="sm">Generate</Button>
                    </li>
                    <li className="p-2 hover:bg-gray-50 rounded flex justify-between items-center">
                      <span>Cash Flow Statement</span>
                      <Button variant="outline" size="sm">Generate</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccountingPanel;
