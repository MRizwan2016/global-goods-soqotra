
import React from "react";
import { Invoice, InvoiceRow } from "./Invoice";

interface InvoiceTableProps {
  invoices: Invoice[];
  handlePayClick: (invoice: Invoice) => void;
  handleViewInvoice: (id: string) => void;
  handleViewPaymentDetails?: (invoice: Invoice) => void;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  handlePayClick,
  handleViewInvoice,
  handleViewPaymentDetails
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice #</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <InvoiceRow 
              key={invoice.id}
              invoice={invoice}
              handlePayClick={handlePayClick}
              handleViewInvoice={handleViewInvoice}
              handleViewPaymentDetails={handleViewPaymentDetails}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
