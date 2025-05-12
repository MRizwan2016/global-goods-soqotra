
import React from "react";
import { AlertCircle, FileText } from "lucide-react";
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
  
  return (
    <div className="w-full relative">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger className={`w-full ${isDuplicate ? 'border-red-500 bg-red-50' : ''}`}>
          <SelectValue placeholder="Select invoice number" />
        </SelectTrigger>
        <SelectContent className="max-h-60 overflow-y-auto bg-white">
          {unassignedInvoices.map((invoice) => (
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
                <div className="text-xs text-gray-500 mt-1 pl-6">
                  Book: <span className="font-medium">{invoice.bookNumber}</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {isDuplicate && (
        <AlertCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500" size={16} />
      )}
    </div>
  );
};

export default InvoiceDropdown;
