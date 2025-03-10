
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

interface InvoiceSelectorProps {
  isEditing: boolean;
  invoiceNumber: string;
  onInvoiceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  availableInvoices: { bookNumber: string; invoiceNumber: string }[];
}

const InvoiceSelector = ({ 
  isEditing, 
  invoiceNumber, 
  onInvoiceChange, 
  availableInvoices 
}: InvoiceSelectorProps) => {
  const [showSelector, setShowSelector] = useState(false);

  const handleSelectInvoice = (selectedInvoice: string) => {
    // Create a synthetic event to simulate input change
    const event = {
      target: {
        name: "invoiceNumber",
        value: selectedInvoice
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    onInvoiceChange(event);
    setShowSelector(false);
    toast.success(`Invoice number ${selectedInvoice} selected`);
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">INVOICE NUMBER:</label>
      <div className="flex gap-2">
        <Input 
          name="invoiceNumber"
          value={invoiceNumber}
          onChange={onInvoiceChange}
          className="border border-gray-300"
          readOnly={!isEditing}
          placeholder="Select an invoice number"
        />
        {!isEditing && (
          <Button 
            type="button"
            onClick={() => setShowSelector(!showSelector)}
            className="bg-blue-500 hover:bg-blue-600 px-2"
          >
            <BookOpen size={18} />
          </Button>
        )}
      </div>
      
      {showSelector && (
        <div className="mt-2 bg-white border border-gray-200 rounded shadow-lg p-2 max-h-60 overflow-y-auto absolute z-10">
          <h4 className="font-medium text-sm mb-2 px-2">Select an Invoice Number</h4>
          {availableInvoices.length > 0 ? (
            <div className="grid grid-cols-2 gap-1">
              {availableInvoices.map((inv) => (
                <div 
                  key={inv.invoiceNumber}
                  onClick={() => handleSelectInvoice(inv.invoiceNumber)}
                  className="text-sm py-1 px-2 hover:bg-blue-50 cursor-pointer rounded flex justify-between"
                >
                  <span>{inv.invoiceNumber}</span>
                  <span className="text-gray-500">(Book {inv.bookNumber})</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 p-2">No available invoice numbers</p>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceSelector;
