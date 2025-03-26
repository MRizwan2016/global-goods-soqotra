
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { UnsettledInvoice } from "../../../types/containerTypes";

interface UnsettledInvoicesTabProps {
  unsettledInvoices: UnsettledInvoice[];
}

const UnsettledInvoicesTab: React.FC<UnsettledInvoicesTabProps> = ({
  unsettledInvoices,
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
        CONTAINER INVOICES
      </div>
      
      <div className="border border-gray-200 rounded-md overflow-hidden">
        <Table>
          <TableHeader className="bg-blue-50">
            <TableRow>
              <TableHead className="font-bold text-blue-800 text-center border-r border-gray-200">Num</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">INVOICE</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">SHIPPER</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">CONSIGNEE</TableHead>
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">AMOUNT</TableHead>
              <TableHead className="font-bold text-blue-800">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unsettledInvoices.map((invoice, index) => (
              <TableRow key={invoice.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <TableCell className="text-center border-r border-gray-200">{index + 1}</TableCell>
                <TableCell className="border-r border-gray-200">{invoice.invoiceNumber || "-"}</TableCell>
                <TableCell className="border-r border-gray-200">{invoice.shipper}</TableCell>
                <TableCell className="border-r border-gray-200">{invoice.consignee}</TableCell>
                <TableCell className="text-right border-r border-gray-200">{invoice.amount.toFixed(2)}</TableCell>
                <TableCell className={`text-center ${invoice.paid ? "text-green-600" : "text-red-600"}`}>
                  {invoice.paid ? "PAID" : "UNPAID"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UnsettledInvoicesTab;
