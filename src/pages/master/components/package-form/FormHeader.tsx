
import React from "react";

interface FormHeaderProps {
  isEditing: boolean;
}

const FormHeader: React.FC<FormHeaderProps> = ({ isEditing }) => {
  return (
    <div className="p-4 bg-green-50 border-b border-green-100">
      <h3 className="text-lg font-medium text-green-800">
        {isEditing ? "Edit Package Option" : "Add Package Option"}
      </h3>
      <p className="text-sm text-green-600 mt-1">
        {isEditing ? "Update package option details" : "Create a new package option for your shipment needs"}
      </p>
    </div>
  );
};

export default FormHeader;
