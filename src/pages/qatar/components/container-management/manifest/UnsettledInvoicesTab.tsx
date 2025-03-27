
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CreditCard } from "lucide-react";

interface UnsettledInvoicesTabProps {
  unsettledInvoices: UnsettledInvoice[];
}

const UnsettledInvoicesTab: React.FC<UnsettledInvoicesTabProps> = ({
  unsettledInvoices,
}) => {
  const navigate = useNavigate();

  const handleRecordPayment = (invoice: UnsettledInvoice) => {
    // Store the invoice data temporarily to use it in the payment form
    sessionStorage.setItem('selectedInvoice', JSON.stringify(invoice));
    navigate("/accounts/add-payment");
  };

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
              <TableHead className="font-bold text-blue-800 border-r border-gray-200">STATUS</TableHead>
              <TableHead className="font-bold text-blue-800">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unsettledInvoices.length > 0 ? (
              unsettledInvoices.map((invoice, index) => (
                <TableRow key={invoice.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="text-center border-r border-gray-200">{index + 1}</TableCell>
                  <TableCell className="border-r border-gray-200">{invoice.invoiceNumber || "-"}</TableCell>
                  <TableCell className="border-r border-gray-200">{invoice.shipper}</TableCell>
                  <TableCell className="border-r border-gray-200">{invoice.consignee}</TableCell>
                  <TableCell className="text-right border-r border-gray-200">{invoice.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center border-r border-gray-200">
                    <Badge 
                      className={`font-medium ${invoice.paid 
                        ? "bg-green-100 text-green-800 hover:bg-green-200" 
                        : "bg-amber-100 text-amber-800 hover:bg-amber-200"}`}
                    >
                      {invoice.paid ? "PAID" : "UNPAID"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {!invoice.paid && (
                      <Button 
                        size="sm"
                        variant="outline"
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                        onClick={() => handleRecordPayment(invoice)}
                      >
                        <CreditCard className="h-4 w-4 mr-1" />
                        Record Payment
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                  No invoices found for this container
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UnsettledInvoicesTab;
