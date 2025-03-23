
import React from "react";
import { Button } from "@/components/ui/button";
import { Save, Printer, Eye } from "lucide-react";
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
    if (!invoiceId) {
      toast.info("Please save the invoice first to preview or print it");
      return;
    }
    
    // Check if the invoice exists in localStorage
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoiceExists = invoices.some((inv: any) => inv.id === invoiceId);
    
    if (!invoiceExists) {
      toast.error("Invoice not found. Please save the invoice again before printing.");
      return;
    }
    
    // Open in new tab but stay within the same session
    const printUrl = `/data-entry/invoicing/print/${invoiceId}`;
    const newWindow = window.open(printUrl, '_blank');
    
    // If popup blocked or failed to open, navigate in same window
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      navigate(printUrl);
    }
  };
  
  const handleInvoicePreview = () => {
    if (!invoiceId) {
      toast.info("Please save the invoice first to preview it");
      return;
    }
    
    // Check if the invoice exists
    const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const invoiceExists = invoices.some((inv: any) => inv.id === invoiceId);
    
    if (!invoiceExists) {
      toast.error("Invoice not found. Please save the invoice first.");
      return;
    }
    
    // Navigate to preview page
    navigate(`/data-entry/invoicing/preview/${invoiceId}`);
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
        onClick={handleInvoicePreview}
        className="border-gray-300"
      >
        <Eye className="mr-2 h-4 w-4" />
        Preview Invoice
      </Button>
      
      <Button
        type="button"
        variant="outline"
        onClick={handlePrintPreview}
        className="border-gray-300"
      >
        <Printer className="mr-2 h-4 w-4" />
        Print Invoice
      </Button>
    </div>
  );
};

export default FormActions;
