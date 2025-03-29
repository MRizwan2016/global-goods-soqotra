
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Printer, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InvoiceFormHeaderProps {
  isEditing: boolean;
}

const InvoiceFormHeader: React.FC<InvoiceFormHeaderProps> = ({ isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePrint = () => {
    if (id) {
      // Use window.open to open in a new tab - this avoids routing issues
      window.open(`/data-entry/print-documents/invoice-print/${id}`, '_blank');
    } else {
      toast.error("Please save the invoice first before printing");
    }
  };
  
  const handlePreview = () => {
    if (id) {
      // Use window.open for preview to avoid routing issues
      window.open(`/data-entry/print-documents/invoice-print/${id}`, '_blank');
    } else {
      toast.error("Please save the invoice first before previewing");
    }
  };

  return (
    <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
      <h3 className="text-lg font-medium text-green-800">
        {isEditing ? "Update Invoice" : "Add Invoice"}
      </h3>
      
      {isEditing && (
        <div className="flex gap-2">
          <Button 
            onClick={handlePreview}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Eye size={16} />
            Preview Invoice
          </Button>
          
          <Button 
            onClick={handlePrint}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Printer size={16} />
            Print Invoice
          </Button>
        </div>
      )}
    </div>
  );
};

export default InvoiceFormHeader;
