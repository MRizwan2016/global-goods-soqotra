
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoiceNumberSelector } from "../../hooks/useInvoiceNumberSelector";
import { 
  InvoiceDropdown,
  ManualEntryForm,
  ManualEntryLink,
  NoInvoicesAvailable,
  StatusIndicators,
  BookSelector
} from "./invoice-selector";

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
  const {
    activeInvoiceUser,
    isDuplicate,
    availableInvoiceList,
    filteredInvoiceList,
    showManualEntry,
    manualInvoiceNumber,
    selectedBookNumber,
    setManualInvoiceNumber,
    setShowManualEntry,
    setSelectedBookNumber,
    onInvoiceSelect,
    handleManualSubmit,
    loadAvailableInvoices,
    handleBookSelect
  } = useInvoiceNumberSelector({
    formState,
    isEditing,
    handleSelectInvoice
  });

  console.log("InvoiceNumberSelector availableInvoiceList:", availableInvoiceList);
  console.log("InvoiceNumberSelector filteredInvoiceList:", filteredInvoiceList);
  console.log("InvoiceNumberSelector selectedBookNumber:", selectedBookNumber);

  return (
    <div className="space-y-2">
      <Label>Invoice Number</Label>
      
      {isEditing ? (
        <Input
          name="invoiceNumber"
          value={formState.invoiceNumber || ""}
          readOnly={true}
          className="w-full"
        />
      ) : (
        <>
          {!showManualEntry ? (
            <>
              <BookSelector onBookSelect={handleBookSelect} />
              
              {filteredInvoiceList.length > 0 ? (
                <InvoiceDropdown
                  value={formState.invoiceNumber || ""}
                  onValueChange={onInvoiceSelect}
                  disabled={isEditing}
                  isDuplicate={isDuplicate}
                  availableInvoices={filteredInvoiceList}
                />
              ) : (
                <NoInvoicesAvailable
                  onManualEntryClick={() => setShowManualEntry(true)}
                />
              )}
              
              <ManualEntryLink
                onClick={() => setShowManualEntry(true)}
              />
            </>
          ) : (
            <ManualEntryForm
              value={manualInvoiceNumber}
              onChange={(e) => setManualInvoiceNumber(e.target.value)}
              onSubmit={handleManualSubmit}
              onCancel={() => {
                setShowManualEntry(false);
                loadAvailableInvoices();
              }}
            />
          )}
        </>
      )}
      
      <StatusIndicators
        activeUser={activeInvoiceUser}
        isDuplicate={isDuplicate}
        isEditing={isEditing}
      />
    </div>
  );
};

export default InvoiceNumberSelector;
