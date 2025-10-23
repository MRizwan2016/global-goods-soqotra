
import React from "react";
import { AlertCircle, FileText, BookOpen } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface InvoiceDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
  disabled?: boolean;
  isDuplicate?: boolean;
  availableInvoices: any[];
}

const InvoiceDropdown: React.FC<InvoiceDropdownProps> = ({
  value,
  onValueChange,
  disabled = false,
  isDuplicate = false,
  availableInvoices
}) => {
  const { language } = useLanguage();
  
  // Show toast if no invoices available
  React.useEffect(() => {
    if (availableInvoices.length === 0) {
      toast.warning(
        language === 'ar' 
          ? "لا توجد أرقام فواتير متاحة لهذا الكتاب" 
          : "No invoice numbers available for this book", 
        {
          description: language === 'ar'
            ? "الرجاء اختيار كتاب آخر أو إدخال رقم فاتورة يدوي"
            : "Please select another book or enter a manual invoice number"
        }
      );
    }
  }, [availableInvoices, language]);

  return (
    <div className="relative">
      <Select
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
      >
        <SelectTrigger 
          className={`w-full ${isDuplicate ? 'border-red-500 text-red-500' : ''}`}
        >
          <SelectValue 
            placeholder={language === 'ar' ? "اختر رقم فاتورة" : "Select invoice number"}
          />
        </SelectTrigger>
        <SelectContent className="bg-white max-h-60 overflow-y-auto z-[100]">
          {availableInvoices.length > 0 ? (
            availableInvoices.map((invoice) => (
              <SelectItem 
                key={invoice.invoiceNumber} 
                value={invoice.invoiceNumber}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-500" />
                  <span>{invoice.invoiceNumber}</span>
                </div>
                <div className="flex flex-col text-xs text-gray-500 ml-2">
                  {invoice.assignedTo && (
                    <span>Rep: {invoice.assignedTo}</span>
                  )}
                  {invoice.driverName && (
                    <span>Driver: {invoice.driverName}</span>
                  )}
                </div>
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-gray-500 text-center">
              {language === 'ar' ? "لا توجد فواتير متاحة" : "No invoices available"}
            </div>
          )}
        </SelectContent>
      </Select>
      
      {isDuplicate && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <AlertCircle className="h-4 w-4 text-red-500" />
        </div>
      )}
    </div>
  );
};

export default InvoiceDropdown;
