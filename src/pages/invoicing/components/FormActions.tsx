
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Save, Printer, Eye } from "lucide-react";

interface FormActionsProps {
  handleSave: () => void;
  invoiceId?: string;
}

const FormActions: React.FC<FormActionsProps> = ({ handleSave, invoiceId }) => {
  const navigate = useNavigate();
  
  const handlePrint = () => {
    if (invoiceId) {
      // Navigate to the print page with the invoice ID
      navigate(`/data-entry/invoicing/print/${invoiceId}?mode=invoice`);
    }
  };
  
  const handlePreview = () => {
    if (invoiceId) {
      // Open preview in a new tab
      window.open(`/data-entry/invoicing/print/${invoiceId}?mode=invoice`, "_blank");
    }
  };
  
  return (
    <div className="flex justify-between mt-6 border-t pt-4">
      <div>
        <Button 
          type="button"
          variant="outline" 
          onClick={() => navigate("/data-entry/invoicing")}
        >
          Back to List
        </Button>
      </div>
      
      <div className="flex gap-2">
        {invoiceId && (
          <>
            <Button 
              type="button"
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handlePreview}
            >
              <Eye size={16} />
              Preview
            </Button>
            
            <Button 
              type="button"
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={handlePrint}
            >
              <Printer size={16} />
              Print
            </Button>
          </>
        )}
        
        <Button 
          type="button"
          className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2" 
          onClick={handleSave}
        >
          <Save size={16} />
          Save
        </Button>
      </div>
    </div>
  );
};

export default FormActions;
