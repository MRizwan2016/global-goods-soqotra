
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FormActionsProps {
  handleSave: () => void;
  isValid?: boolean;
  invoiceId?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  handleSave, 
  isValid = true,
  invoiceId
}) => {
  const navigate = useNavigate();
  
  const handlePrintPreview = () => {
    // If we have an invoice ID, navigate to the print view
    if (invoiceId) {
      // Open in new tab but stay within the same session
      const printUrl = `/data-entry/invoicing/print/${invoiceId}`;
      const newWindow = window.open(printUrl, '_blank');
      
      // If popup blocked or failed to open, navigate in same window
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        navigate(printUrl);
      }
    } else {
      // If no ID yet, we need to save first
      toast.info("Please save the invoice first to preview or print it");
    }
  };

  return (
    <div className="flex justify-end gap-3 mt-8 mb-4">
      <Button
        type="button"
        variant="default"
        disabled={!isValid}
        onClick={handleSave}
        className="bg-green-600 hover:bg-green-700"
      >
        <Save className="mr-2 h-4 w-4" />
        Save Invoice
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={handlePrintPreview}
        className="border-gray-300"
      >
        <Printer className="mr-2 h-4 w-4" />
        Preview Invoice
      </Button>
    </div>
  );
};

export default FormActions;
