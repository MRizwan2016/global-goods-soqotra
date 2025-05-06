
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ProfitLossData, CountryProfitData } from "../../types/profitLossTypes";

interface ProfitLossSummaryProps {
  data: ProfitLossData | null;
  byCountry: Record<string, CountryProfitData>;
  isLoading: boolean;
}

const ProfitLossSummary: React.FC<ProfitLossSummaryProps> = ({
  data,
  byCountry,
  isLoading,
}) => {
  // Calculate total profit
  const totalPaid = data?.revenue.paid || 0;
  const totalExpenses = data?.expenses.total || 0;
  const totalProfit = totalPaid - totalExpenses;
  const profitMargin = totalPaid > 0 ? (totalProfit / totalPaid) * 100 : 0;
  
  // Get countries with highest profit
  const countriesWithProfit = Object.entries(byCountry)
    .map(([name, data]) => ({
      name,
      profit: data.revenue - data.expenses,
    }))
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 3);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-white">
            <CardContent className="p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded-md mb-2 w-24"></div>
              <div className="h-8 bg-gray-200 rounded-md w-32"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="text-center py-4">
      <h1 className="text-2xl font-bold mb-8 uppercase">PROFIT AND LOSS STATEMENT</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">QAR {totalPaid.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{data?.revenue.invoiceCount} invoices</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Expenses</h3>
            <p className="text-2xl font-bold text-red-600">QAR {totalExpenses.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">{data?.expenses.count} expense entries</p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Net Profit</h3>
            <p className="text-2xl font-bold text-blue-600">QAR {totalProfit.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">
              {profitMargin.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Top Country</h3>
            {countriesWithProfit.length > 0 ? (
              <>
                <p className="text-lg font-bold">{countriesWithProfit[0].name}</p>
                <p className="text-sm font-medium text-green-600">
                  QAR {countriesWithProfit[0].profit.toLocaleString()}
                </p>
              </>
            ) : (
              <p className="text-lg font-bold">-</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfitLossSummary;
