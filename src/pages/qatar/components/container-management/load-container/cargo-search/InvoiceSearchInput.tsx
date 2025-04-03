
import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface InvoiceSuggestion {
  invoiceNumber: string;
  shipper: string;
  consignee: string;
  volume?: number;
  weight?: number;
  packageName?: string;
  packages?: number;
  d2d?: boolean;
  warehouse?: string;
  [key: string]: any;
}

interface InvoiceSearchInputProps {
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  bookingFormSuggestions?: InvoiceSuggestion[];
  showSuggestions?: boolean;
  setShowSuggestions?: (show: boolean) => void;
  onSelectInvoice?: (invoice: InvoiceSuggestion) => void;
  bookingForm?: string;
  onBookingFormChange?: (value: string) => void;
}

const InvoiceSearchInput: React.FC<InvoiceSearchInputProps> = ({
  value,
  onChange,
  onKeyPress,
  bookingFormSuggestions = [],
  showSuggestions = false,
  setShowSuggestions = () => {},
  onSelectInvoice = () => {},
  bookingForm,
  onBookingFormChange,
}) => {
  // Handle input focus to show suggestions when at least 3 characters are typed
  const handleInputFocus = () => {
    if (value && value.length >= 3 && bookingFormSuggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Watch for value changes to show suggestions when typing
  useEffect(() => {
    if (value && value.length >= 3) {
      setShowSuggestions(true);
    } else if (value.length < 3) {
      setShowSuggestions(false);
    }
  }, [value, setShowSuggestions]);

  return (
    <div className="relative">
      <Label className="font-bold text-gray-700 mb-1 block">GY/INVOICE NUMBER:</Label>
      <div className="flex gap-2 items-center">
        <Search size={24} className="text-gray-700" />
        <Input
          value={value}
          onChange={onChange}
          placeholder="GY/INVOICE"
          className="flex-1"
          onFocus={handleInputFocus}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={onKeyPress}
        />
      </div>
      
      {showSuggestions && (
        <div className="absolute w-full bg-white border border-gray-300 rounded shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
          {bookingFormSuggestions.length > 0 ? (
            bookingFormSuggestions.map((invoice, index) => (
              <div
                key={index}
                className="p-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                onClick={() => onSelectInvoice(invoice)}
              >
                <div className="font-medium">{invoice.invoiceNumber}</div>
                <div className="text-sm text-gray-600">
                  {invoice.shipper} → {invoice.consignee}
                </div>
                {invoice.packages && (
                  <div className="text-xs text-gray-500">
                    Pkgs: {invoice.packages} | Vol: {invoice.volume?.toFixed(2) || 0} m³ | Weight: {invoice.weight?.toFixed(2) || 0} kg
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No matching invoices found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default InvoiceSearchInput;
