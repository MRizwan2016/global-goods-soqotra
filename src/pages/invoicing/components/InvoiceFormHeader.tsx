
import React from "react";
import { useParams } from "react-router-dom";

interface InvoiceFormHeaderProps {
  isEditing: boolean;
}

const InvoiceFormHeader: React.FC<InvoiceFormHeaderProps> = ({ isEditing }) => {
  return (
    <div className="p-4 bg-green-50 border-b border-green-100">
      <h3 className="text-lg font-medium text-green-800">
        {isEditing ? "Update Invoice" : "Add Invoice"}
      </h3>
    </div>
  );
};

export default InvoiceFormHeader;
