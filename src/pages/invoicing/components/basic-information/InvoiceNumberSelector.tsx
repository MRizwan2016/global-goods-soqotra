
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoiceNumberSelector } from "../../hooks/useInvoiceNumberSelector";
import { 
  InvoiceDropdown,
  ManualEntryForm,
  ManualEntryLink,
  NoInvoicesAvailable,
  StatusIndicators
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
    showManualEntry,
    manualInvoiceNumber,
    setManualInvoiceNumber,
    setShowManualEntry,
    onInvoiceSelect,
    handleManualSubmit,
    loadAvailableInvoices
  } = useInvoiceNumberSelector({
    formState,
    isEditing,
    handleSelectInvoice
  });

  // Log available invoices for debugging
  console.log("InvoiceNumberSelector availableInvoiceList:", availableInvoiceList);

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
              {availableInvoiceList.length > 0 ? (
                <InvoiceDropdown
                  value={formState.invoiceNumber || ""}
                  onValueChange={onInvoiceSelect}
                  disabled={isEditing}
                  isDuplicate={isDuplicate}
                  availableInvoices={availableInvoiceList}
                />
              ) : (
                <NoInvoicesAvailable
                  onManualEntryClick={() => setShowManualEntry(true)}
                />
              )}
              
              {availableInvoiceList.length > 0 && (
                <ManualEntryLink
                  onClick={() => setShowManualEntry(true)}
                />
              )}
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
