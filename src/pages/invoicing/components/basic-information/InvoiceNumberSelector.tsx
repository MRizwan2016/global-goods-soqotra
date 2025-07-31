import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
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
  handleInputChange,
  handleSelectInvoice,
  availableInvoices,
  isEditing
}) => {
  const { isAdmin } = useAuth();
  const [isModifying, setIsModifying] = React.useState(false);
  
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
        <div className="flex gap-2">
          <Input
            name="invoiceNumber"
            value={formState.invoiceNumber || ""}
            readOnly={!isModifying}
            onChange={handleInputChange}
            className="w-full"
            placeholder="Invoice number"
          />
          {isAdmin && (
            <Button
              type="button"
              variant={isModifying ? "destructive" : "outline"}
              size="sm"
              onClick={() => setIsModifying(!isModifying)}
            >
              {isModifying ? "Lock" : "Modify"}
            </Button>
          )}
        </div>
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