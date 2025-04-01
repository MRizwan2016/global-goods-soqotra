
import React from "react";
import { TableRow, InvoiceTableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil, Trash, Eye, Printer } from "lucide-react";

interface InvoiceTableRowProps {
  item: any;
  index: number;
  indexOffset: number;
  onPrint: (id: string) => void;
}

const InvoiceTableRow: React.FC<InvoiceTableRowProps> = ({
  item,
  index,
  indexOffset,
  onPrint
}) => {
  // Format number values consistently
  const formatNumber = (value: any): string => {
    if (value === undefined || value === null) return "0.00";
    
    // Convert to number if it's a string
    let num: number;
    if (typeof value === 'string') {
      num = parseFloat(value);
    } else {
      num = value;
    }
    
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  // Ensure all required fields have values
  const ensureValue = (value: any): string => {
    return value !== undefined && value !== null ? value : "";
  };

  // Format date for display
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <TableRow className="hover:bg-gray-50 transition-colors">
      <InvoiceTableCell className="text-center">{indexOffset + index + 1}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Link to={`/data-entry/invoicing/edit/${item.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
            <Pencil className="h-4 w-4" />
          </Button>
        </Link>
      </InvoiceTableCell>
      <InvoiceTableCell>{formatDate(item.date || item.invoiceDate)}</InvoiceTableCell>
      <InvoiceTableCell>{ensureValue(item.invoiceNumber)}</InvoiceTableCell>
      <InvoiceTableCell>{ensureValue(item.shipper1)}</InvoiceTableCell>
      <InvoiceTableCell>{ensureValue(item.consignee1)}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{ensureValue(item.salesAgent)}</InvoiceTableCell>
      <InvoiceTableCell>{ensureValue(item.warehouse)}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{item.doorToDoor === true || item.doorToDoor === "Yes" ? "Yes" : "No"}</InvoiceTableCell>
      <InvoiceTableCell>{ensureValue(item.nic)}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{formatNumber(item.volume)}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{formatNumber(item.weight)}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{ensureValue(item.packages)}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{formatNumber(item.gross)}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{formatNumber(item.discount)}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{formatNumber(item.net)}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">{item.paid ? "Yes" : "No"}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{formatNumber(item.statusCharge)}</InvoiceTableCell>
      <InvoiceTableCell className="text-right">{formatNumber(item.offerDiscount || item.offerDisc)}</InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
          <Trash className="h-4 w-4" />
        </Button>
      </InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Link to={`/data-entry/invoicing/view/${item.id}`}>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-green-600">
            <Eye className="h-4 w-4" />
          </Button>
        </Link>
      </InvoiceTableCell>
      <InvoiceTableCell className="text-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-blue-600"
          onClick={() => onPrint(item.id)}
        >
          <Printer className="h-4 w-4" />
        </Button>
      </InvoiceTableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;
