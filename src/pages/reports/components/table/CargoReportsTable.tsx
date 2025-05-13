
import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableHeader, 
  TableRow, 
  InvoiceTableHead,
  InvoiceTableCell 
} from "@/components/ui/table";

interface CargoReportsTableProps {
  currentEntries: any[];
  indexOfFirstEntry: number;
  onViewInvoice: (invoice: any) => void;
}

const CargoReportsTable: React.FC<CargoReportsTableProps> = ({
  currentEntries,
  indexOfFirstEntry,
  onViewInvoice
}) => {
  // Format number for display
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
  
  return (
    <div className="overflow-x-auto border border-gray-200 shadow-sm rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-[#33C3F0] hover:bg-[#1EA5E9]">
            <InvoiceTableHead className="w-16">Num</InvoiceTableHead>
            <InvoiceTableHead className="w-28">INV. Num</InvoiceTableHead>
            <InvoiceTableHead className="w-28">INV. DATE</InvoiceTableHead>
            <InvoiceTableHead>CUSTOMER</InvoiceTableHead>
            <InvoiceTableHead>SHIPPER</InvoiceTableHead>
            <InvoiceTableHead>CONSIGNEE</InvoiceTableHead>
            <InvoiceTableHead className="w-16">SEA/AIR</InvoiceTableHead>
            <InvoiceTableHead>ZONE</InvoiceTableHead>
            <InvoiceTableHead>WAREHOUSE</InvoiceTableHead>
            <InvoiceTableHead className="w-16">VOL</InvoiceTableHead>
            <InvoiceTableHead className="w-20">WGHT</InvoiceTableHead>
            <InvoiceTableHead className="w-16">PKGS</InvoiceTableHead>
            <InvoiceTableHead className="w-20">FREIGHT</InvoiceTableHead>
            <InvoiceTableHead className="w-20">DISC</InvoiceTableHead>
            <InvoiceTableHead className="w-20">NET</InvoiceTableHead>
            <InvoiceTableHead className="w-16">PAID</InvoiceTableHead>
            <InvoiceTableHead className="w-20">DUE</InvoiceTableHead>
            <InvoiceTableHead>PAYMENT DATE</InvoiceTableHead>
            <InvoiceTableHead>PAY STATUS</InvoiceTableHead>
            <InvoiceTableHead className="w-20">DISPLAY</InvoiceTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEntries.length > 0 ? (
            currentEntries.map((item, index) => (
              <TableRow key={item.id} className="hover:bg-[#F2FCE2] transition-colors">
                <InvoiceTableCell className="text-center">{indexOfFirstEntry + index + 1}</InvoiceTableCell>
                <InvoiceTableCell>{item.invoiceNumber}</InvoiceTableCell>
                <InvoiceTableCell>{item.date}</InvoiceTableCell>
                <InvoiceTableCell>{item.customer}</InvoiceTableCell>
                <InvoiceTableCell>{item.shipper1}</InvoiceTableCell>
                <InvoiceTableCell>{item.consignee1}</InvoiceTableCell>
                <InvoiceTableCell className="text-center">{item.transport}</InvoiceTableCell>
                <InvoiceTableCell>{item.zone}</InvoiceTableCell>
                <InvoiceTableCell>{item.warehouse}</InvoiceTableCell>
                <InvoiceTableCell className="text-right">{formatNumber(item.volume)}</InvoiceTableCell>
                <InvoiceTableCell className="text-right">{formatNumber(item.weight)}</InvoiceTableCell>
                <InvoiceTableCell className="text-center">{item.packages}</InvoiceTableCell>
                <InvoiceTableCell className="text-right">{formatNumber(item.freight || item.gross)}</InvoiceTableCell>
                <InvoiceTableCell className="text-right">{formatNumber(item.discount)}</InvoiceTableCell>
                <InvoiceTableCell className="text-right">{formatNumber(item.net)}</InvoiceTableCell>
                <InvoiceTableCell className="text-center">{item.paid ? formatNumber(item.net) : "0.00"}</InvoiceTableCell>
                <InvoiceTableCell className="text-right">{item.paid ? "0.00" : formatNumber(item.net)}</InvoiceTableCell>
                <InvoiceTableCell>{item.paymentDate || (item.paid ? item.date : "-")}</InvoiceTableCell>
                <InvoiceTableCell>{item.paid ? "PAID" : "UNPAID"}</InvoiceTableCell>
                <InvoiceTableCell className="text-center">
                  <Button 
                    variant="ghost" 
                    className="text-blue-500 p-0 h-auto hover:bg-blue-50 hover:scale-105 transition-transform"
                    onClick={() => onViewInvoice(item)}
                  >
                    DISPLAY
                  </Button>
                </InvoiceTableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <InvoiceTableCell colSpan={20} className="text-center py-4">
                No data available in table
              </InvoiceTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CargoReportsTable;
