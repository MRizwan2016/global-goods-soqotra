
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceApprovalSystem from "./components/accounting/InvoiceApprovalSystem";
import PackageReceiptSystem from "./components/warehouse/PackageReceiptSystem";
import BackButton from "@/components/ui/back-button";
import { 
  TrendingUp, 
  TrendingDown, 
  ChevronRight, 
  DollarSign, 
  PackageCheck,
  PackageX,
  FileCheck
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageBreadcrumb from "@/components/ui/page-breadcrumb";

const KenyaFinancialSystem = () => {
  const [activeTab, setActiveTab] = useState("invoice-approval");
  
  // Mock financial summary data
  const financialSummary = {
    revenue: 2875000,
    expenses: 1920000,
    profit: 955000,
    profitMargin: 33.2,
    pendingInvoices: 12,
    paidInvoices: 45,
    pendingPayments: 3,
    pendingApprovals: 5
  };
  
  return (
    <Layout title="Kenya Financial System">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <BackButton to="/kenya/deliveries" />
            <h3 className="text-lg font-medium text-green-800">Kenya Financial Management</h3>
          </div>
        </div>
        
        <div className="p-4">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold">KES {financialSummary.revenue.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Expenses</p>
                    <p className="text-2xl font-bold">KES {financialSummary.expenses.toLocaleString()}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Net Profit</p>
                    <p className="text-2xl font-bold">KES {financialSummary.profit.toLocaleString()}</p>
                    <p className="text-xs text-green-600">{financialSummary.profitMargin}% margin</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Invoices</p>
                    <p className="text-2xl font-bold">{financialSummary.paidInvoices} <span className="text-sm text-green-600">Paid</span></p>
                    <p className="text-sm text-amber-600">{financialSummary.pendingInvoices} pending</p>
                  </div>
                  <FileCheck className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Package Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <PackageCheck className="h-8 w-8 text-green-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Packages Received</p>
                    <p className="text-2xl font-bold">248 <span className="text-sm text-green-600">packages</span></p>
                    <p className="text-xs text-gray-500">From Mombasa CFS</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <PackageX className="h-8 w-8 text-blue-500 mr-4" />
                  <div>
                    <p className="text-sm text-gray-500">Pending Receipt</p>
                    <p className="text-2xl font-bold">32 <span className="text-sm text-blue-600">packages</span></p>
                    <p className="text-xs text-gray-500">In transit from Mombasa</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Tabs */}
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="invoice-approval">Invoice Approval</TabsTrigger>
              <TabsTrigger value="package-receipt">Package Receipt</TabsTrigger>
            </TabsList>
            
            <TabsContent value="invoice-approval">
              <InvoiceApprovalSystem />
            </TabsContent>
            
            <TabsContent value="package-receipt">
              <PackageReceiptSystem />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default KenyaFinancialSystem;
