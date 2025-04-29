
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { Calendar, Download, Filter, RefreshCw } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { useProfitLossData } from "./hooks/useProfitLossData";
import ProfitLossChart from "./components/profit-loss/ProfitLossChart";
import ProfitLossSummary from "./components/profit-loss/ProfitLossSummary";
import { Badge } from "@/components/ui/badge";
import { CountrySelector } from "./components/profit-loss/CountrySelector";

const ProfitLossPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [view, setView] = useState<"summary" | "detailed">("summary");
  const [refreshKey, setRefreshKey] = useState<number>(0);
  
  const { 
    profitLossData, 
    profitLossByCountry, 
    isLoading, 
    columnDefs 
  } = useProfitLossData(selectedCountry, dateRange, refreshKey);
  
  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <Layout title="Profit & Loss">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold">Profit & Loss Analysis</h1>
            <p className="text-muted-foreground">
              Track revenue, expenses, and profitability across all countries
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="flex items-center gap-1"
            >
              <RefreshCw size={16} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download size={16} />
              Export
            </Button>
          </div>
        </div>
        
        <Card className="bg-white">
          <CardHeader className="bg-gray-50 border-b pb-3">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <CardTitle className="text-lg">Filters & Controls</CardTitle>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={view === "summary" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setView("summary")}
                >
                  Summary View
                </Button>
                <Button 
                  variant={view === "detailed" ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setView("detailed")}
                >
                  Detailed View
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full md:w-1/3">
                <CountrySelector
                  selectedCountry={selectedCountry}
                  onChange={setSelectedCountry}
                />
              </div>
              
              <div className="w-full md:w-2/3">
                <DatePickerWithRange 
                  date={dateRange} 
                  setDate={setDateRange} 
                />
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <ProfitLossSummary 
                  data={profitLossData} 
                  byCountry={profitLossByCountry} 
                  isLoading={isLoading} 
                />
                
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Performance Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ProfitLossChart data={profitLossData} />
                    </div>
                  </CardContent>
                </Card>
                
                {view === "detailed" && (
                  <Card className="bg-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Transaction Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <DataTable 
                        columns={columnDefs}
                        data={profitLossData?.transactions || []}
                        isLoading={isLoading}
                      />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="revenue" className="space-y-4">
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Revenue Sources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center p-8">Loading revenue data...</div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="text-sm text-gray-500">Invoiced Amount</div>
                              <div className="text-2xl font-bold">
                                ${profitLossData?.revenue.total.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                {profitLossData?.revenue.invoiceCount} invoices
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-green-50">
                            <CardContent className="p-4">
                              <div className="text-sm text-gray-500">Paid Amount</div>
                              <div className="text-2xl font-bold text-green-600">
                                ${profitLossData?.revenue.paid.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                {profitLossData?.revenue.paidCount} paid invoices
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-yellow-50">
                            <CardContent className="p-4">
                              <div className="text-sm text-gray-500">Pending Amount</div>
                              <div className="text-2xl font-bold text-amber-600">
                                ${profitLossData?.revenue.pending.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                {profitLossData?.revenue.pendingCount} pending invoices
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <DataTable 
                          columns={columnDefs.filter(col => col.id !== 'expenseType')}
                          data={profitLossData?.transactions.filter(t => t.type === 'revenue') || []}
                          isLoading={isLoading}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="expenses" className="space-y-4">
                <Card className="bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Expense Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="flex justify-center p-8">Loading expense data...</div>
                    ) : (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Card className="bg-red-50">
                            <CardContent className="p-4">
                              <div className="text-sm text-gray-500">Total Expenses</div>
                              <div className="text-2xl font-bold text-red-600">
                                ${profitLossData?.expenses.total.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                {profitLossData?.expenses.count} expense entries
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-blue-50">
                            <CardContent className="p-4">
                              <div className="text-sm text-gray-500">Net Profit</div>
                              <div className="text-2xl font-bold text-blue-600">
                                ${(profitLossData?.revenue.paid - profitLossData?.expenses.total).toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                Based on paid invoices
                              </div>
                            </CardContent>
                          </Card>
                          <Card className="bg-purple-50">
                            <CardContent className="p-4">
                              <div className="text-sm text-gray-500">Profit Margin</div>
                              <div className="text-2xl font-bold text-purple-600">
                                {profitLossData?.revenue.paid > 0 ? 
                                  ((profitLossData?.revenue.paid - profitLossData?.expenses.total) / 
                                   profitLossData?.revenue.paid * 100).toFixed(1) : 
                                  0}%
                              </div>
                              <div className="text-xs text-gray-500 mt-2">
                                Based on paid invoices
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <DataTable 
                          columns={columnDefs}
                          data={profitLossData?.transactions.filter(t => t.type === 'expense') || []}
                          isLoading={isLoading}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfitLossPage;
