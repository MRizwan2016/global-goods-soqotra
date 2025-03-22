
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
        UNSETTLED INVOICES
      </div>
      
      <Table>
        <TableHeader className="bg-blue-50">
          <TableRow>
            <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">GY</TableHead>
            <TableHead className="font-bold text-blue-800">SHIPPER</TableHead>
            <TableHead className="font-bold text-blue-800">CONSIGNEE</TableHead>
            <TableHead className="font-bold text-blue-800 text-right">NET</TableHead>
            <TableHead className="font-bold text-blue-800 text-right">PAID</TableHead>
            <TableHead className="font-bold text-blue-800 text-right">DUE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unsettledInvoices.map((invoice, index) => (
            <TableRow key={invoice.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{invoice.gy}</TableCell>
              <TableCell>{invoice.shipper}</TableCell>
              <TableCell>{invoice.consignee}</TableCell>
              <TableCell className="text-right">{invoice.net}</TableCell>
              <TableCell className="text-right">{invoice.paid}</TableCell>
              <TableCell className="text-right">{invoice.due}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UnsettledInvoicesTab;
