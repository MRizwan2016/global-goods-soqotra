
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InvoiceSuggestion {
  invoiceNumber: string;
  shipper: string;
  consignee: string;
  [key: string]: any;
}

interface InvoiceSearchInputProps {
  bookingForm: string;
  onBookingFormChange: (value: string) => void;
  bookingFormSuggestions: InvoiceSuggestion[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  onSelectInvoice: (invoice: InvoiceSuggestion) => void;
}

const InvoiceSearchInput: React.FC<InvoiceSearchInputProps> = ({
  bookingForm,
  onBookingFormChange,
  bookingFormSuggestions,
  showSuggestions,
  setShowSuggestions,
  onSelectInvoice,
}) => {
  return (
    <div className="relative">
      <Label className="font-bold text-gray-700 mb-1 block">GY/INVOICE NUMBER:</Label>
      <div className="flex gap-2 items-center">
        <Search size={24} className="text-gray-700" />
        <Input
          value={bookingForm}
          onChange={(e) => onBookingFormChange(e.target.value)}
          placeholder="GY/INVOICE"
          className="flex-1"
          onFocus={() => bookingFormSuggestions.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
      </div>
      
      {showSuggestions && (
        <div className="absolute w-full bg-white border border-gray-300 rounded shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
          {bookingFormSuggestions.map((invoice, index) => (
            <div
              key={index}
              className="p-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
              onClick={() => onSelectInvoice(invoice)}
            >
              <div className="font-medium">{invoice.invoiceNumber}</div>
              <div className="text-sm text-gray-600">
                {invoice.shipper} → {invoice.consignee}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceSearchInput;
