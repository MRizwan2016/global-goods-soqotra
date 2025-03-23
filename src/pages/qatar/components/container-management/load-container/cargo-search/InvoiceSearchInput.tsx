
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface InvoiceSearchInputProps {
  bookingForm: string;
  onBookingFormChange: (value: string) => void;
  bookingFormSuggestions: any[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  onSelectInvoice: (invoice: any) => void;
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
    <div className="col-span-2">
      <Label className="font-bold text-gray-700 mb-1 block">SEARCH BOOKING FORM:</Label>
      <div className="flex gap-2 relative">
        <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
          <PopoverTrigger asChild>
            <div className="flex-1 relative">
              <Input
                value={bookingForm}
                onChange={(e) => onBookingFormChange(e.target.value)}
                placeholder="Enter invoice number (GY 13136051)"
                className="w-full"
              />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <div className="max-h-[200px] overflow-y-auto">
              {bookingFormSuggestions.map((invoice) => (
                <div 
                  key={invoice.invoiceNumber}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => onSelectInvoice(invoice)}
                >
                  {invoice.invoiceNumber} - {invoice.shipper}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Button 
          variant="default" 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => toast.info("Searching for invoice...")}
        >
          <Search size={18} />
        </Button>
      </div>
    </div>
  );
};

export default InvoiceSearchInput;
