
import React from 'react';

interface FormHeaderProps {
  isEditing: boolean;
  country: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ isEditing, country }) => {
  return (
    <div className="p-4 bg-blue-50 border-b border-blue-100">
      <h3 className="text-lg font-medium text-blue-800">
        {isEditing 
          ? `Update Selling Tariff - ${country}` 
          : `Add Selling Tariff - ${country}`}
      </h3>
    </div>
  );
};

export default FormHeader;
