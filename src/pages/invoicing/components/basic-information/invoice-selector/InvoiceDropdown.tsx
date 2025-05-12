
import React from "react";
import { AlertCircle, FileText, BookOpen } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface InvoiceDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  isDuplicate?: boolean;
  availableInvoices: Array<{
    invoiceNumber: string;
    bookNumber: string;
    assignedTo?: string;
  }>;
}

const InvoiceDropdown: React.FC<InvoiceDropdownProps> = ({
  value,
  onValueChange,
  disabled = false,
  isDuplicate = false,
  availableInvoices
}) => {
  // Filter out any invoices that have an assignedTo value
  const unassignedInvoices = availableInvoices.filter(invoice => !invoice.assignedTo);
  
  // Get book info for selected invoice
  const selectedInvoice = availableInvoices.find(invoice => invoice.invoiceNumber === value);
  const selectedBookInfo = selectedInvoice ? `Book: ${selectedInvoice.bookNumber}` : "";
  
  console.log("InvoiceDropdown values:", {
    value,
    availableInvoices,
    unassignedInvoices,
    selectedInvoice,
    selectedBookInfo
  });

  return (
    <div className="w-full relative">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className={`w-full ${isDuplicate ? 'border-red-500 bg-red-50' : ''}`}>
          <div className="flex flex-col items-start text-left">
            <SelectValue placeholder="Select invoice number" />
            {value && selectedBookInfo && (
              <span className="text-xs text-gray-500 mt-1">{selectedBookInfo}</span>
            )}
          </div>
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto bg-white">
          {unassignedInvoices.length > 0 ? (
            unassignedInvoices.map((invoice) => (
              <SelectItem 
                key={invoice.invoiceNumber} 
                value={invoice.invoiceNumber}
                className="py-2 px-2 hover:bg-gray-100"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{invoice.invoiceNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 pl-6">
                    <BookOpen className="h-3 w-3" />
                    <span>Book: <span className="font-medium">{invoice.bookNumber}</span></span>
                  </div>
                </div>
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">No invoices available</div>
          )}
        </SelectContent>
      </Select>
      
      {isDuplicate && (
        <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500" size={16} />
      )}
    </div>
  );
};

export default InvoiceDropdown;
