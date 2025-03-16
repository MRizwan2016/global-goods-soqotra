
import React from "react";
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
  LineChart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AccountingPanel = () => {
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

          {/* Reconciliation Tab */}
          <TabsContent value="reconciliation" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Payment Reconciliation</h3>
              <Button size="sm" className="flex items-center gap-1">
                <Receipt className="h-4 w-4" />
                New Reconciliation
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Banking Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV-2023-001</TableCell>
                  <TableCell>Global Shipping Co.</TableCell>
                  <TableCell>$4,750.00</TableCell>
                  <TableCell>2023-06-12</TableCell>
                  <TableCell>2023-06-15</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Reconciled</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-2023-002</TableCell>
                  <TableCell>TransWorld Logistics</TableCell>
                  <TableCell>$2,340.00</TableCell>
                  <TableCell>2023-06-18</TableCell>
                  <TableCell>2023-06-20</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Reconciled</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV-2023-003</TableCell>
                  <TableCell>Premium Cargo Ltd.</TableCell>
                  <TableCell>$5,120.00</TableCell>
                  <TableCell>2023-06-25</TableCell>
                  <TableCell>Pending</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pending</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">Process</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabsContent>

          {/* Profit & Loss Tab */}
          <TabsContent value="profit-loss" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Profit & Loss Analysis</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Select Period
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
              </div>
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
