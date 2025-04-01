
import React from "react";

const ErrorState: React.FC = () => {
  return (
    <div className="max-w-[210mm] mx-auto bg-white p-8 shadow-md text-center">
      <h2 className="text-xl text-red-500">Bill of Lading data not available</h2>
      <p className="mt-2">The requested Bill of Lading could not be loaded.</p>
    </div>
  );
};

export default ErrorState;
