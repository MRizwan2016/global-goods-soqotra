
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InvoiceNumberSelectorProps {
  formState: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showInvoiceSelector: boolean;
  setShowInvoiceSelector: (show: boolean) => void;
  availableInvoices: any[];
  handleSelectInvoice: (invoiceNumber: string) => void;
  isEditing: boolean;
  activeInvoiceUser: string;
}

const InvoiceNumberSelector: React.FC<InvoiceNumberSelectorProps> = ({
  formState,
  handleInputChange,
  showInvoiceSelector,
  setShowInvoiceSelector,
  availableInvoices,
  handleSelectInvoice,
  isEditing,
  activeInvoiceUser,
}) => {
  return (
    <div className="space-y-2">
      <Label>Invoice Number</Label>
      <div className="flex gap-2 items-center">
        <Input
          name="invoiceNumber"
          value={formState.invoiceNumber}
          onChange={handleInputChange}
          className="w-full"
          readOnly={isEditing}
          onClick={() => !isEditing && setShowInvoiceSelector(true)}
        />
        {activeInvoiceUser && (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
            {activeInvoiceUser}
          </div>
        )}
      </div>

      <Dialog open={showInvoiceSelector} onOpenChange={setShowInvoiceSelector}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Invoice Number</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {availableInvoices.map(invoice => (
              <Button 
                key={invoice.invoiceNumber}
                variant="outline"
                onClick={() => handleSelectInvoice(invoice.invoiceNumber)}
              >
                {invoice.invoiceNumber} (Book {invoice.bookNumber})
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvoiceNumberSelector;
