
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ProfitLossData } from "../../types/profitLossTypes";
import { Column } from "@/components/ui/data-table";

interface ExpensesTabContentProps {
  profitLossData: ProfitLossData | null;
  isLoading: boolean;
  columnDefs: Column[];
}

const ExpensesTabContent: React.FC<ExpensesTabContentProps> = ({
  profitLossData,
  isLoading,
  columnDefs,
}) => {
  return (
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
  );
};

export default ExpensesTabContent;
