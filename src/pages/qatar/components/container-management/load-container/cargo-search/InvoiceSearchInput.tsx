
import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface InvoiceData {
  invoiceNumber: string;
  shipper: string;
  shipper1?: string;
  consignee: string;
  consignee1?: string;
  warehouse?: string;
  volume?: number;
  weight?: number;
  packageName?: string;
  packages?: number;
  d2d?: boolean;
  [key: string]: any;
}

interface InvoiceSearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  showSuggestions?: boolean;
  setShowSuggestions?: (show: boolean) => void;
  onSelectInvoice?: (invoice: InvoiceData) => void;
}

const InvoiceSearchInput: React.FC<InvoiceSearchInputProps> = ({
  value,
  onChange,
  onKeyPress,
  showSuggestions = false,
  setShowSuggestions = () => {},
  onSelectInvoice = () => {},
}) => {
  const [suggestions, setSuggestions] = useState<InvoiceData[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load and filter suggestions when value changes
  useEffect(() => {
    if (value && value.length >= 3) {
      // Get invoices from localStorage
      const storedInvoices = localStorage.getItem('invoices');
      const generatedInvoices = localStorage.getItem('generatedInvoices');
      let allInvoices: InvoiceData[] = [];

      try {
        if (storedInvoices) {
          allInvoices = [...JSON.parse(storedInvoices)];
        }
        
        if (generatedInvoices) {
          allInvoices = [...allInvoices, ...JSON.parse(generatedInvoices)];
        }

        // Filter invoices based on input
        const filtered = allInvoices.filter(inv => 
          inv.invoiceNumber?.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filtered);
        setShowSuggestions(filtered.length > 0);
        
        console.log("Found matching invoices:", filtered.length, filtered);
      } catch (error) {
        console.error("Error loading invoices:", error);
        toast.error("Error loading invoices", {
          description: "There was a problem loading the invoice suggestions",
          icon: <AlertCircle className="h-5 w-5 text-red-500" />
        });
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value, setShowSuggestions]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);

  return (
    <div className="relative">
      <Label className="font-bold text-gray-700 mb-1 block">GY/INVOICE NUMBER:</Label>
      <div className="flex gap-2 items-center">
        <Search size={24} className="text-gray-700" />
        <Input
          ref={inputRef}
          value={value}
          onChange={onChange}
          placeholder="Start typing invoice number..."
          className="flex-1"
          onFocus={() => {
            if (value && value.length >= 3 && suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onKeyDown={onKeyPress}
        />
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute w-full bg-white border border-gray-300 rounded shadow-lg z-50 mt-1 max-h-60 overflow-y-auto"
        >
          {suggestions.map((invoice, index) => (
            <div
              key={index}
              className="p-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
              onClick={() => {
                onSelectInvoice(invoice);
                setShowSuggestions(false);
              }}
            >
              <div className="font-medium text-blue-600">{invoice.invoiceNumber}</div>
              <div className="text-sm text-gray-600">
                {invoice.shipper || invoice.shipper1} → {invoice.consignee || invoice.consignee1}
              </div>
              {invoice.packages && (
                <div className="text-xs text-gray-500">
                  Pkgs: {invoice.packages} | Vol: {invoice.volume?.toFixed(2) || 0} m³ | Weight: {invoice.weight?.toFixed(2) || 0} kg
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvoiceSearchInput;
