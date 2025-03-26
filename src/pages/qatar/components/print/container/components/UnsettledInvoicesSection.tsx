
import React from "react";
import { UnsettledInvoice } from "../../../../types/containerTypes";
import { CreditCard } from "lucide-react";

interface UnsettledInvoicesSectionProps {
  unsettledInvoices: UnsettledInvoice[];
  formatCurrency: (amount: number) => string;
}

const UnsettledInvoicesSection: React.FC<UnsettledInvoicesSectionProps> = ({
  unsettledInvoices,
  formatCurrency
}) => {
  return (
    <div className="unsettled-invoices page-break-before">
      <div className="flex items-center mb-2">
        <CreditCard className="mr-2 h-5 w-5 text-red-600" />
        <h2 className="text-lg font-semibold uppercase">UNSETTLED INVOICES</h2>
      </div>
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 text-left uppercase">INVOICE NUMBER</th>
            <th className="border p-2 text-left uppercase">SHIPPER</th>
            <th className="border p-2 text-left uppercase">CONSIGNEE</th>
            <th className="border p-2 text-left uppercase">AMOUNT</th>
            <th className="border p-2 text-left uppercase">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {unsettledInvoices.filter(invoice => !invoice.paid).length === 0 ? (
            <tr>
              <td colSpan={5} className="border p-4 text-center uppercase">NO UNSETTLED INVOICES FOUND</td>
            </tr>
          ) : (
            unsettledInvoices.filter(invoice => !invoice.paid).map(invoice => (
              <tr key={invoice.id} className="border-b">
                <td className="border p-2 uppercase">{invoice.invoiceNumber}</td>
                <td className="border p-2 uppercase">{invoice.shipper}</td>
                <td className="border p-2 uppercase">{invoice.consignee}</td>
                <td className="border p-2">{formatCurrency(invoice.amount)}</td>
                <td className="border p-2 text-red-600 font-semibold uppercase">OUTSTANDING</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UnsettledInvoicesSection;
