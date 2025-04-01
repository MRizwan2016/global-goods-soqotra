
import React from "react";
import InvoiceActionButton from "./InvoiceActionButton";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  consignee1?: string;
  consignee?: string;
  customer?: string;
  net?: number;
  amount?: number;
  gross?: number;
  discount?: number;
  paid: boolean;
  currency?: string;
  [key: string]: any;
}

interface InvoiceRowProps {
  invoice: Invoice;
  handlePayClick: (invoice: Invoice) => void;
  handleViewInvoice: (id: string) => void;
  handleViewPaymentDetails?: (invoice: Invoice) => void;
}

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ 
  invoice, 
  handlePayClick, 
  handleViewInvoice,
  handleViewPaymentDetails 
}) => {
  // Determine the customer name from various possible fields
  const customerName = invoice.consignee1 || invoice.consignee || invoice.customer || 'Unknown';
  // Get amount from net, amount, or calculate from gross-discount
  const amount = invoice.net || invoice.amount || 
    ((invoice.gross || 0) - (invoice.discount || 0));
    
  return (
    <tr key={invoice.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {invoice.invoiceNumber}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {invoice.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {customerName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {(invoice.currency || 'QAR')} {amount.toFixed(2)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          invoice.paid 
            ? "bg-green-100 text-green-800" 
            : "bg-yellow-100 text-yellow-800"
        }`}>
          {invoice.paid ? "Paid" : "Unpaid"}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          {!invoice.paid ? (
            <InvoiceActionButton 
              type="pay"
              onClick={() => handlePayClick(invoice)}
            />
          ) : (
            <InvoiceActionButton 
              type="details"
              onClick={() => handleViewPaymentDetails && handleViewPaymentDetails(invoice)}
            />
          )}
          <InvoiceActionButton 
            type="view"
            onClick={() => handleViewInvoice(invoice.id)}
          />
        </div>
      </td>
    </tr>
  );
};
