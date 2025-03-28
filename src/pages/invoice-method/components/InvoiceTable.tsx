
import React from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText } from "lucide-react";

interface InvoiceTableProps {
  status: "unpaid" | "partial" | "paid";
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ status }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice #
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Invoice Amount
            </th>
            {status === "partial" && (
              <>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Remaining
                </th>
              </>
            )}
            {status === "paid" && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Date
              </th>
            )}
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {status === "paid" ? "Receipt" : "Status"}
            </th>
            {status !== "paid" && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {status === "unpaid" && (
            <>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1001</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-15</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ahmed Mohamed</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,500.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Unpaid
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Collect
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1002</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-10</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sara Ali</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 2,250.00</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Unpaid
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <CreditCard className="h-3 w-3" />
                    Collect
                  </Button>
                </td>
              </tr>
            </>
          )}
          {status === "partial" && (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1003</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-08</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mohammed Khalid</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 3,000.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold text-amber-600">QR 1,500.00</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  Complete
                </Button>
              </td>
            </tr>
          )}
          {status === "paid" && (
            <>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-1000</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-01</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fatima Hassan</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 2,750.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-02</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    View
                  </Button>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-999</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Abdulrahman Ali</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,850.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-27</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    View
                  </Button>
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
