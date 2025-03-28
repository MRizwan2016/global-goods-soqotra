
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CreditCard, FileText } from "lucide-react";
import PaymentActionButton from "@/components/payment/PaymentActionButton";
import ReceiptView from "@/components/payment/ReceiptView";
import { useNavigate } from "react-router-dom";

interface InvoiceTableProps {
  status: "unpaid" | "partial" | "paid";
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ status }) => {
  const navigate = useNavigate();
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  const handleViewReceipt = (invoice: any) => {
    setSelectedReceipt({
      receiptNumber: `REC-${Math.floor(10000 + Math.random() * 90000)}`,
      invoiceNumber: invoice.id,
      date: invoice.date,
      customer: invoice.customer,
      amount: invoice.amount,
      paymentMethod: "Bank Transfer",
      currency: "QAR",
      remarks: invoice.remarks || "",
    });
    setIsReceiptOpen(true);
  };

  const handleCollectPayment = (invoice: any) => {
    // Save invoice to session storage for payment page
    sessionStorage.setItem('selectedInvoice', JSON.stringify({
      id: invoice.id,
      invoiceNumber: invoice.id,
      shipper: "Shipper Company",
      consignee: invoice.customer,
      amount: invoice.amount,
      paid: false
    }));
    
    // Navigate to payment page
    navigate('/accounts/add-payment');
  };

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
                  <PaymentActionButton 
                    type="collect" 
                    onClick={() => handleCollectPayment({
                      id: "INV-1001",
                      date: "2023-05-15",
                      customer: "Ahmed Mohamed",
                      amount: 1500.00
                    })} 
                  />
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
                  <PaymentActionButton 
                    type="collect" 
                    onClick={() => handleCollectPayment({
                      id: "INV-1002",
                      date: "2023-05-10",
                      customer: "Sara Ali",
                      amount: 2250.00
                    })} 
                  />
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
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                  Partial
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <PaymentActionButton 
                  type="complete" 
                  onClick={() => handleCollectPayment({
                    id: "INV-1003",
                    date: "2023-05-08",
                    customer: "Mohammed Khalid",
                    amount: 1500.00, // Remaining amount
                    totalAmount: 3000.00,
                    paidAmount: 1500.00
                  })} 
                />
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
                  <PaymentActionButton 
                    type="view" 
                    onClick={() => handleViewReceipt({
                      id: "INV-1000",
                      date: "2023-05-01",
                      customer: "Fatima Hassan",
                      amount: 2750.00
                    })} 
                  />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">INV-999</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-25</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Abdulrahman Ali</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">QR 1,850.00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-04-27</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <PaymentActionButton 
                    type="view" 
                    onClick={() => handleViewReceipt({
                      id: "INV-999",
                      date: "2023-04-25",
                      customer: "Abdulrahman Ali",
                      amount: 1850.00
                    })} 
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      {selectedReceipt && (
        <ReceiptView 
          isOpen={isReceiptOpen} 
          onClose={() => setIsReceiptOpen(false)} 
          receiptData={selectedReceipt}
        />
      )}
    </div>
  );
};

export default InvoiceTable;
