
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
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-gray-50 animate-pulse">
            <CardContent className="p-6 h-24"></CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (!data) {
    return (
      <div className="flex justify-center p-8 border rounded-md">
        <p className="text-muted-foreground">No financial data available</p>
      </div>
    );
  }

  // Calculate total profit
  const totalProfit = data.revenue.paid - data.expenses.total;
  const profitMargin = data.revenue.paid > 0 
    ? (totalProfit / data.revenue.paid) * 100 
    : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl font-bold text-green-700">
              ${data.revenue.paid.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              From {data.revenue.paidCount} paid invoices
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-2xl font-bold text-red-700">
              ${data.expenses.total.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              From {data.expenses.count} expense entries
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Net Profit</p>
            <p className={`text-2xl font-bold ${totalProfit >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
              ${totalProfit.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Based on paid invoices
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Profit Margin</p>
            <p className={`text-2xl font-bold ${profitMargin >= 0 ? 'text-purple-700' : 'text-red-700'}`}>
              {profitMargin.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Of total revenue
            </p>
          </CardContent>
        </Card>
      </div>
      
      {Object.keys(byCountry).length > 0 && (
        <Card>
          <CardContent className="p-4">
            <p className="text-base font-semibold mb-2">Profit by Country</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(byCountry).map(([country, countryData]) => {
                const countryProfit = countryData.revenue - countryData.expenses;
                const countryMargin = countryData.revenue > 0 
                  ? (countryProfit / countryData.revenue) * 100 
                  : 0;
                  
                return (
                  <Card key={country} className="bg-gray-50">
                    <CardContent className="p-3">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">{country}</p>
                        <span className={`text-sm font-semibold ${countryProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ${countryProfit.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Revenue: ${countryData.revenue.toFixed(2)}</span>
                        <span className={countryMargin >= 0 ? 'text-green-600' : 'text-red-600'}>
                          {countryMargin.toFixed(1)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfitLossSummary;
