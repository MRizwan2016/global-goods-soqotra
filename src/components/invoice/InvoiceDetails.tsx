
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Invoice } from "@/hooks/use-invoice-search";
import { CheckCircle, XCircle } from "lucide-react";

interface InvoiceDetailsProps {
  invoice: Invoice | null;
}

const InvoiceDetails = ({ invoice }: InvoiceDetailsProps) => {
  if (!invoice) return null;

  const formatCurrency = (value: string) => {
    const numValue = parseFloat(value);
    return numValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Invoice #{invoice.invoiceNumber}</CardTitle>
          {invoice.paid ? (
            <Badge className="bg-green-100 text-green-800">Paid</Badge>
          ) : (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              Unpaid
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Invoice Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Date:</span>
                <span>{invoice.date}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Customer:</span>
                <span>{invoice.customer}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Country:</span>
                <span>{invoice.country}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Warehouse:</span>
                <span>{invoice.warehouse}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Sales Agent:</span>
                <span>{invoice.salesAgent}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Shipping Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Shipper:</span>
                <span>{invoice.shipper1}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Consignee:</span>
                <span>{invoice.consignee1}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Door to Door:</span>
                <span className="flex items-center">
                  {invoice.doorToDoor ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                      Yes
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500 mr-1" />
                      No
                    </>
                  )}
                </span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Volume:</span>
                <span>{invoice.volume}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-gray-600">Weight:</span>
                <span>{invoice.weight}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 border-t pt-4">
          <h3 className="font-medium text-gray-700 mb-2">Payment Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-500">Gross</div>
              <div className="text-lg font-semibold">{formatCurrency(invoice.gross)}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-500">Discount</div>
              <div className="text-lg font-semibold">{formatCurrency(invoice.discount)}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <div className="text-xs text-gray-500">Offer Discount</div>
              <div className="text-lg font-semibold">{formatCurrency(invoice.offerDiscount)}</div>
            </div>
            <div className="p-3 bg-blue-50 rounded">
              <div className="text-xs text-blue-700">Net Amount</div>
              <div className="text-lg font-bold text-blue-700">{formatCurrency(invoice.net)}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetails;
