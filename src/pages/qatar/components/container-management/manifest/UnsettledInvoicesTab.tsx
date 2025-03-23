
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UnsettledInvoice } from "../../../types/containerTypes";
import { FilePlus } from "lucide-react";
import { toast } from "sonner";

interface UnsettledInvoicesTabProps {
  unsettledInvoices: UnsettledInvoice[];
}

const UnsettledInvoicesTab: React.FC<UnsettledInvoicesTabProps> = ({
  unsettledInvoices,
}) => {
  const handleAssignNumber = (invoiceId: string) => {
    // This would update the invoice in a real app
    toast.success(`Invoice number assigned to ID: ${invoiceId}`);
  };
  
  const handleAssignAllMissing = () => {
    const missingCount = unsettledInvoices.filter(inv => !inv.invoiceNumber).length;
    if (missingCount > 0) {
      toast.success(`${missingCount} missing invoices have been assigned numbers`);
    } else {
      toast.info("No missing invoice numbers to assign");
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-600 text-white text-center py-2 mb-2 font-bold">
        UNSETTLED INVOICES
      </div>
      
      <div className="flex justify-end mb-4">
        <Button 
          className="bg-green-600 hover:bg-green-700"
          onClick={handleAssignAllMissing}
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Assign All Missing Invoice Numbers
        </Button>
      </div>
      
      <Table>
        <TableHeader className="bg-blue-50">
          <TableRow>
            <TableHead className="font-bold text-blue-800 text-center">Num</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">Invoice Number</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">GY</TableHead>
            <TableHead className="font-bold text-blue-800">SHIPPER</TableHead>
            <TableHead className="font-bold text-blue-800">CONSIGNEE</TableHead>
            <TableHead className="font-bold text-blue-800 text-right">NET</TableHead>
            <TableHead className="font-bold text-blue-800 text-right">PAID</TableHead>
            <TableHead className="font-bold text-blue-800 text-right">DUE</TableHead>
            <TableHead className="font-bold text-blue-800 text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {unsettledInvoices.map((invoice, index) => (
            <TableRow key={invoice.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">
                {invoice.invoiceNumber ? (
                  <div className="font-medium text-blue-700">{invoice.invoiceNumber}</div>
                ) : (
                  <Input 
                    value="" 
                    placeholder="No Invoice #"
                    className="h-8 text-sm text-center text-red-500"
                    readOnly
                  />
                )}
              </TableCell>
              <TableCell className="text-center">{invoice.gy}</TableCell>
              <TableCell>{invoice.shipper}</TableCell>
              <TableCell>{invoice.consignee}</TableCell>
              <TableCell className="text-right">{invoice.net}</TableCell>
              <TableCell className="text-right">{invoice.paid}</TableCell>
              <TableCell className="text-right">{invoice.due}</TableCell>
              <TableCell className="text-center">
                {!invoice.invoiceNumber && (
                  <Button 
                    variant="outline" 
                    className="h-8 text-xs border-blue-500 text-blue-500 hover:bg-blue-50"
                    onClick={() => handleAssignNumber(invoice.id)}
                  >
                    Assign Number
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
          
          {unsettledInvoices.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                No unsettled invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UnsettledInvoicesTab;
