
import React from 'react';

interface FormHeaderProps {
  isEditing: boolean;
  country: string; // Changed from an object with value to just a string
}

const FormHeader: React.FC<FormHeaderProps> = ({ isEditing, country }) => {
  return (
    <div className="bg-soqotra-navy text-white px-6 py-4">
      <h2 className="text-xl font-semibold">
        {isEditing ? "Update Selling Tariff" : "Add Selling Tariff"}
      </h2>
      {country && (
        <p className="text-sm opacity-80 mt-1">
          Country: {country}
        </p>
      )}
    </div>
  );
};

export default FormHeader;
