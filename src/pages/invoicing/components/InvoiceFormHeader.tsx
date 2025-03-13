
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoiceFormHeaderProps {
  isEditing: boolean;
}

const InvoiceFormHeader: React.FC<InvoiceFormHeaderProps> = ({ isEditing }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handlePrint = () => {
    if (id) {
      window.open(`/data-entry/invoicing/print/${id}`, '_blank');
    }
  };

  return (
    <div className="p-4 bg-green-50 border-b border-green-100 flex justify-between items-center">
      <h3 className="text-lg font-medium text-green-800">
        {isEditing ? "Update Invoice" : "Add Invoice"}
      </h3>
      
      {isEditing && (
        <Button 
          onClick={handlePrint}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Printer size={16} />
          Print Invoice
        </Button>
      )}
    </div>
  );
};

export default InvoiceFormHeader;
