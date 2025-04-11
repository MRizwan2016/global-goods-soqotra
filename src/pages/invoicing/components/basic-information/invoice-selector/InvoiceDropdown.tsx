
import React from "react";
import { AlertCircle } from "lucide-react";
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
        <SelectContent className="max-h-60">
          {availableInvoices.map((invoice) => (
            <SelectItem 
              key={invoice.invoiceNumber} 
              value={invoice.invoiceNumber}
              className="flex justify-between items-center"
            >
              <div className="flex flex-col">
                <span>{invoice.invoiceNumber}</span>
                <span className="text-xs text-gray-500">Book {invoice.bookNumber}</span>
              </div>
              {invoice.assignedTo && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {invoice.assignedTo}
                </span>
              )}
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
