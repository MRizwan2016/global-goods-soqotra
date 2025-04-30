
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { ProfitLossData } from "../../types/profitLossTypes";
import { Column } from "@/components/ui/data-table";

interface RevenueTabContentProps {
  profitLossData: ProfitLossData | null;
  isLoading: boolean;
  columnDefs: Column[];
}

const RevenueTabContent: React.FC<RevenueTabContentProps> = ({
  profitLossData,
  isLoading,
  columnDefs,
}) => {
  return (
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
  );
};

export default RevenueTabContent;
