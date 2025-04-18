
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockInvoiceData } from "@/data/mockData";
import { toast } from "sonner";

interface InvoiceSelectorProps {
  invoiceNumber: string;
  onInvoiceSelect: (invoiceNumber: string) => void;
}

const InvoiceSelector = ({ invoiceNumber, onInvoiceSelect }: InvoiceSelectorProps) => {
  const [showInvoiceSelector, setShowInvoiceSelector] = useState(false);
  
  // Filter invoices to only show Kenya-related ones
  const kenyaInvoices = mockInvoiceData.filter(invoice => 
    invoice.country === "Kenya" || 
    invoice.sector === "KE" || 
    invoice.sector === "Kenya"
  );

  const handleInvoiceSelect = (invoiceNumber: string) => {
    onInvoiceSelect(invoiceNumber);
    setShowInvoiceSelector(false);
    toast.success(`Invoice #${invoiceNumber} data loaded successfully`);
  };

  return (
    <div className="flex-1">
      <Label htmlFor="invoiceNumber">Invoice Number</Label>
      <div className="flex gap-2 mt-1">
        <Input
          id="invoiceNumber"
          name="invoiceNumber"
          value={invoiceNumber}
          placeholder="Enter invoice number"
          className="flex-1"
          readOnly
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowInvoiceSelector(true)}
        >
          Select Invoice
        </Button>
      </div>
      
      {showInvoiceSelector && (
        <div className="mt-4 border rounded-md p-4 bg-gray-50">
          <div className="mb-2 flex justify-between items-center">
            <h4 className="font-medium">Select Kenya Invoice</h4>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={() => setShowInvoiceSelector(false)}
            >
              Close
            </Button>
          </div>
          
          {kenyaInvoices.length > 0 ? (
            <div className="max-h-40 overflow-y-auto">
              {kenyaInvoices.map(invoice => (
                <div 
                  key={invoice.id} 
                  className="border-b py-2 flex justify-between hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleInvoiceSelect(invoice.invoiceNumber)}
                >
                  <div>
                    <div className="font-medium">{invoice.invoiceNumber}</div>
                    <div className="text-sm text-gray-500">
                      {invoice.consignee1} | {invoice.date}
                    </div>
                  </div>
                  <div>
                    <Button variant="ghost" size="sm">
                      Select
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">
              No Kenya invoices found. Please create a new delivery record.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceSelector;
