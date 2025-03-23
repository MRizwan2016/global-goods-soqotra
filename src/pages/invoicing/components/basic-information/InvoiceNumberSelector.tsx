
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
          <Select
            value={formState.invoiceNumber || ""}
            onValueChange={handleSelectInvoice}
            disabled={isEditing}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select invoice number" />
            </SelectTrigger>
            <SelectContent>
              {enhancedInvoices.map((invoice: any) => (
                <SelectItem key={invoice.invoiceNumber} value={invoice.invoiceNumber}>
                  {invoice.invoiceNumber} (Book {invoice.bookNumber})
                  {invoice.assignedTo && ` - ${invoice.assignedTo}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {activeInvoiceUser && (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap">
            {activeInvoiceUser}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceNumberSelector;
