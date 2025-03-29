
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define the Invoice interface to match the one in PaymentReceivable.tsx
interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  shipper1: string;
  consignee1: string;
  net: number;
  paid: boolean;
  [key: string]: any; // Allow other properties
}

interface InvoiceTableProps {
  invoices: Invoice[];
  onPay: (invoice: Invoice) => void;
  onView: (id: string) => void;
  showPayButton: boolean;
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({ 
  invoices, 
  onPay, 
  onView,
  showPayButton 
}) => {
  return (
    <Table>
      <TableCaption>List of {showPayButton ? 'unpaid' : 'paid'} invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice #</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Shipper</TableHead>
          <TableHead>Consignee</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.invoiceNumber || '-'}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>{invoice.shipper1}</TableCell>
            <TableCell>{invoice.consignee1}</TableCell>
            <TableCell className="text-right">{invoice.net}</TableCell>
            <TableCell>
              <Badge 
                variant="secondary"
                className={invoice.paid ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
              >
                {invoice.paid ? "Paid" : "Unpaid"}
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex justify-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onView(invoice.id)}
                  className="h-8 px-2 text-blue-600"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                
                {showPayButton && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onPay(invoice)}
                    className="h-8 px-2 text-green-600"
                  >
                    <CreditCard className="h-4 w-4 mr-1" />
                    Pay
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
