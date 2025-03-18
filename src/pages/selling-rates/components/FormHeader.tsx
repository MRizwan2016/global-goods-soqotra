
import React from 'react';

interface FormHeaderProps {
  isEditing: boolean;
  country: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ isEditing, country }) => {
  return (
    <div className="p-4 bg-green-50 border-b border-green-100">
      <h3 className="text-lg font-medium text-green-800">
        {isEditing 
          ? `Update Selling Tariff - ${country}` 
          : `Add Selling Tariff - ${country}`}
      </h3>
    </div>
  );
};

export default FormHeader;
