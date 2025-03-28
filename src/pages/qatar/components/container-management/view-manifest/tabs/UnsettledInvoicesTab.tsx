
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UnsettledInvoicesTabProps {
  unsettledInvoices: any[];
}

const UnsettledInvoicesTab: React.FC<UnsettledInvoicesTabProps> = ({ unsettledInvoices }) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle>UNSETTLED INVOICES</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left border">INVOICE</th>
                <th className="p-2 text-left border">SHIPPER</th>
                <th className="p-2 text-left border">CONSIGNEE</th>
                <th className="p-2 text-left border">AMOUNT</th>
                <th className="p-2 text-left border">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {unsettledInvoices && unsettledInvoices.length > 0 ? (
                unsettledInvoices.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-2 border">{item.invoiceNumber || 'N/A'}</td>
                    <td className="p-2 border">{item.shipper}</td>
                    <td className="p-2 border">{item.consignee}</td>
                    <td className="p-2 border">${item.amount.toFixed(2)}</td>
                    <td className="p-2 border">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        item.paid ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {item.paid ? "PAID" : "UNPAID"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500 border">
                    NO UNSETTLED INVOICES
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnsettledInvoicesTab;
