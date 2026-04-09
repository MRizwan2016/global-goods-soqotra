
import React from "react";
import InvoiceActionButton from "./InvoiceActionButton";
import { Invoice } from "../../types/invoice";
import { MessageCircle, Printer, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InvoiceRowProps {
  invoice: Invoice;
  handlePayClick: (invoice: Invoice) => void;
  handleViewInvoice: (id: string) => void;
  handleViewPaymentDetails?: (invoice: Invoice) => void;
}

const getStatusInfo = (invoice: Invoice) => {
  if (invoice.paid) {
    return { label: 'Paid', bg: 'bg-green-100 text-green-800', rowBg: 'bg-green-50/40' };
  }
  if (invoice.partiallyPaid || (invoice.totalPaid && invoice.totalPaid > 0 && !invoice.paid)) {
    return { label: 'Partial', bg: 'bg-orange-100 text-orange-800', rowBg: 'bg-orange-50/40' };
  }
  return { label: 'Unpaid', bg: 'bg-red-100 text-red-800', rowBg: 'bg-red-50/40' };
};

const handleWhatsAppShare = (invoice: Invoice) => {
  const currencyLabel = invoice.currency || 'QAR';
  const amount = typeof invoice.net === 'number' ? invoice.net.toFixed(2) : parseFloat(String(invoice.net || 0)).toFixed(2);
  const message = [
    `📧 *INVOICE: ${invoice.invoiceNumber}*`,
    `━━━━━━━━━━━━━━━`,
    `Customer: ${invoice.consignee1 || invoice.shipper1 || 'N/A'}`,
    `Amount: ${currencyLabel} ${amount}`,
    invoice.country ? `Country: ${invoice.country}` : '',
    `Status: ${invoice.paid ? 'PAID' : 'UNPAID'}`,
    `━━━━━━━━━━━━━━━`,
    `SOQOTRA LOGISTICS`,
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
};

const handleEmailShare = (invoice: Invoice) => {
  const currencyLabel = invoice.currency || 'QAR';
  const amount = typeof invoice.net === 'number' ? invoice.net.toFixed(2) : parseFloat(String(invoice.net || 0)).toFixed(2);
  const subject = `Invoice ${invoice.invoiceNumber} - Soqotra Logistics`;
  const body = `Dear Customer,\n\nPlease find your invoice details below:\n\nInvoice #: ${invoice.invoiceNumber}\nAmount: ${currencyLabel} ${amount}\nStatus: ${invoice.paid ? 'PAID' : 'UNPAID'}\n\nRegards,\nSoqotra Logistics`;
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
};

const handlePrintInvoice = (invoice: Invoice) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) { toast.error("Popup blocked"); return; }
  const currencyLabel = invoice.currency || 'QAR';
  const amount = typeof invoice.net === 'number' ? invoice.net.toFixed(2) : parseFloat(String(invoice.net || 0)).toFixed(2);
  printWindow.document.write(`<html><head><title>Invoice ${invoice.invoiceNumber}</title>
    <style>body{font-family:Arial;padding:40px}h1{color:#1e2a3a}table{width:100%;border-collapse:collapse;margin:20px 0}td,th{border:1px solid #ddd;padding:10px;text-align:left}.header{text-align:center;margin-bottom:30px}.status-paid{color:green;font-weight:bold}.status-unpaid{color:red;font-weight:bold}</style></head>
    <body><div class="header"><h1>SOQOTRA LOGISTICS</h1><h2>Invoice #${invoice.invoiceNumber}</h2></div>
    <table><tr><th>Field</th><th>Details</th></tr>
    <tr><td>Invoice Number</td><td>${invoice.invoiceNumber}</td></tr>
    <tr><td>Date</td><td>${invoice.date}</td></tr>
    <tr><td>Shipper</td><td>${invoice.shipper1 || 'N/A'}</td></tr>
    <tr><td>Consignee</td><td>${invoice.consignee1 || 'N/A'}</td></tr>
    <tr><td>Country</td><td>${invoice.country || 'N/A'}</td></tr>
    <tr><td>Amount</td><td>${currencyLabel} ${amount}</td></tr>
    <tr><td>Status</td><td class="${invoice.paid ? 'status-paid' : 'status-unpaid'}">${invoice.paid ? 'PAID' : 'UNPAID'}</td></tr>
    </table></body></html>`);
  printWindow.document.close();
  printWindow.print();
};

export const InvoiceRow: React.FC<InvoiceRowProps> = ({ 
  invoice, 
  handlePayClick, 
  handleViewInvoice,
  handleViewPaymentDetails 
}) => {
  const extractName = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val.name) return String(val.name);
    return '';
  };
  
  const customerName = extractName(invoice.consignee1) || extractName(invoice.consignee) || 
    extractName(invoice.shipper1) || 'N/A';

  const amount = invoice.net || invoice.amount || ((invoice.gross || 0) - (invoice.discount || 0));
  const formattedAmount = typeof amount === 'number' ? amount.toFixed(2) : parseFloat(String(amount || 0)).toFixed(2);
  const statusInfo = getStatusInfo(invoice);
    
  return (
    <tr key={invoice.id} className={`hover:bg-gray-100 ${statusInfo.rowBg}`}>
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
        {invoice.invoiceNumber}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {invoice.date}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {customerName}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-400 uppercase">
        {invoice.country || '—'}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
        {(invoice.currency || 'QAR')} {formattedAmount}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusInfo.bg}`}>
          {statusInfo.label}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-1 flex-wrap">
          {!invoice.paid && (
            <InvoiceActionButton 
              type="pay"
              onClick={() => handlePayClick(invoice)}
            />
          )}
          {invoice.paid && handleViewPaymentDetails && (
            <InvoiceActionButton 
              type="details"
              onClick={() => handleViewPaymentDetails(invoice)}
            />
          )}
          <InvoiceActionButton 
            type="view"
            onClick={() => handleViewInvoice(invoice.id)}
          />
          <Button variant="outline" size="sm" className="h-7 px-2 text-green-600" onClick={() => handleWhatsAppShare(invoice)} title="WhatsApp">
            <MessageCircle className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-blue-600" onClick={() => handlePrintInvoice(invoice)} title="Print">
            <Printer className="h-3.5 w-3.5" />
          </Button>
          <Button variant="outline" size="sm" className="h-7 px-2 text-purple-600" onClick={() => handleEmailShare(invoice)} title="Email">
            <Mail className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export type { Invoice } from "../../types/invoice";
