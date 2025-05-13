
import React from "react";
import { useJobForm } from "./context/JobFormContext";

const PackageDescriptionSection: React.FC = () => {
  const { jobData, handleInputChange, readOnly } = useJobForm();
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">PACKAGE DESCRIPTION</h3>
      
      <textarea
        name="packageDetails"
        value={jobData.packageDetails || ""}
        onChange={handleInputChange}
        readOnly={readOnly}
        className="w-full p-3 border rounded-md min-h-[100px] resize-none"
        placeholder="Enter package description details"
      />
    </div>
  );
};

export default PackageDescriptionSection;
