
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  BarChart3,
  PieChart,
  DollarSign,
  Download,
  CreditCard,
  Receipt,
  Calculator,
  BarChart4
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountingPanel from "@/components/accounting/AccountingPanel";

const FinancialReportsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout title="Financial Reports">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Reports</h1>
            <p className="text-muted-foreground">
              Analyze financial performance and generate reports
            </p>
          </div>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <BarChart4 className="mr-1 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-1">
              <BarChart3 className="mr-1 h-4 w-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex items-center gap-1">
              <LineChart className="mr-1 h-4 w-4" />
              Expenses
            </TabsTrigger>
            <TabsTrigger value="profitloss" className="flex items-center gap-1">
              <PieChart className="mr-1 h-4 w-4" />
              Profit & Loss
            </TabsTrigger>
            <TabsTrigger value="accounting" className="flex items-center gap-1">
              <DollarSign className="mr-1 h-4 w-4" />
              Accounting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <div className="text-2xl font-bold">$24,560.00</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-green-500">+15%</span> from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Outstanding Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-amber-600" />
                    <div className="text-2xl font-bold">$7,230.00</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-amber-500">12 invoices</span> pending payment
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" />
                    <div className="text-2xl font-bold">$14,320.00</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-blue-500">+8%</span> from last quarter
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>
                  Summary of key financial metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart4 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Chart visualization will appear here</p>
                  <p className="text-sm mt-2">Select a date range to view detailed reports</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>
                  Breakdown of revenue streams and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Revenue chart visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Analysis</CardTitle>
                <CardDescription>
                  Breakdown of expenses and cost centers
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LineChart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Expense chart visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profitloss" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <CardDescription>
                  Comprehensive profit and loss analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <PieChart className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Profit & Loss visualization will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accounting" className="mt-6">
            <AccountingPanel />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FinancialReportsPage;
