
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

interface InvoiceNumberSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: (show: boolean) => void;
  availableInvoices: any[];
  handleSelectInvoice: (invoiceNumber: string) => void;
  isEditing: boolean;
}

const InvoiceNumberSelector: React.FC<InvoiceNumberSelectorProps> = ({
  formState,
  handleSelectInvoice,
  availableInvoices,
  isEditing
}) => {
  const [activeInvoiceUser, setActiveInvoiceUser] = useState<string>("");
  const [isDuplicate, setIsDuplicate] = useState<boolean>(false);
  
  // Check for duplicate invoice numbers when form state changes
  useEffect(() => {
    if (formState.invoiceNumber) {
      checkForDuplicateInvoice(formState.invoiceNumber);
    }
  }, [formState.invoiceNumber]);
  
  useEffect(() => {
    if (formState.invoiceNumber) {
      const activeBooks = JSON.parse(localStorage.getItem('activeInvoiceBooks') || '[]');
      const bookWithInvoice = activeBooks.find((book: any) => 
        book.availablePages.includes(formState.invoiceNumber)
      );
      
      if (bookWithInvoice) {
        setActiveInvoiceUser(bookWithInvoice.assignedTo);
      } else {
        // Check for invoice in the availableInvoices array
        const selectedInvoice = availableInvoices.find(
          invoice => invoice.invoiceNumber === formState.invoiceNumber
        );
        if (selectedInvoice && selectedInvoice.assignedTo) {
          setActiveInvoiceUser(selectedInvoice.assignedTo);
        }
      }
    }
  }, [formState.invoiceNumber, availableInvoices]);

  // Function to check if the invoice number is already in use
  const checkForDuplicateInvoice = (invoiceNumber: string) => {
    // Skip validation for edit mode as we're editing an existing invoice
    if (isEditing) {
      setIsDuplicate(false);
      return;
    }
    
    // Get existing invoices from localStorage
    const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    
    // Check if the invoice number is already used
    const duplicateFound = existingInvoices.some((invoice: any) => 
      invoice.invoiceNumber === invoiceNumber
    );
    
    // Also check in generated invoices if they exist
    const generatedInvoices = JSON.parse(localStorage.getItem('generatedInvoices') || '[]');
    const duplicateInGenerated = generatedInvoices.some((invoice: any) => 
      invoice.invoiceNumber === invoiceNumber
    );
    
    // Update the duplicate state
    const isDuplicateFound = duplicateFound || duplicateInGenerated;
    setIsDuplicate(isDuplicateFound);
    
    // Show warning toast if duplicate is found
    if (isDuplicateFound) {
      toast.warning("Duplicate Invoice Number", {
        description: `Invoice number ${invoiceNumber} is already assigned to another customer`,
        duration: 5000,
      });
    }
  };

  // Add GY invoice numbers if not present
  const enhancedInvoices = formState.invoiceNumber && !availableInvoices.length
    ? [{ invoiceNumber: formState.invoiceNumber, bookNumber: "DEFAULT", assignedTo: "System" }]
    : availableInvoices.length 
      ? availableInvoices 
      : Array.from({ length: 10 }, (_, i) => ({
          invoiceNumber: `GY ${(13136051 + i).toString()}`,
          bookNumber: "DEFAULT",
          assignedTo: "System"
        }));

  // Custom handler for invoice selection
  const onInvoiceSelect = (value: string) => {
    // Check for duplicate before setting
    checkForDuplicateInvoice(value);
    handleSelectInvoice(value);
  };

  return (
    <div className="space-y-2">
      <Label>Invoice Number</Label>
      <div className="flex gap-2 items-center">
        {isEditing ? (
          <Input
            name="invoiceNumber"
            value={formState.invoiceNumber || ""}
            readOnly={true}
            className="w-full"
          />
        ) : (
          <div className="w-full relative">
            <Select
              value={formState.invoiceNumber || ""}
              onValueChange={onInvoiceSelect}
              disabled={isEditing}
            >
              <SelectTrigger className={`w-full ${isDuplicate ? 'border-red-500 bg-red-50' : ''}`}>
                <SelectValue placeholder="Select invoice number" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {enhancedInvoices.map((invoice: any) => (
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
        )}
        {activeInvoiceUser && (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap">
            {activeInvoiceUser}
          </div>
        )}
        {isDuplicate && !isEditing && (
          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap">
            Duplicate
          </div>
        )}
      </div>
      {isDuplicate && !isEditing && (
        <div className="text-sm text-red-600 flex items-center mt-1">
          <AlertCircle size={14} className="mr-1" />
          This invoice number is already assigned to another customer
        </div>
      )}
    </div>
  );
};

export default InvoiceNumberSelector;
