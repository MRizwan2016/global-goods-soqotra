
import React from "react";

const EmptyState = () => {
  return (
    <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
      <p className="text-gray-500">NO ITEMS ADDED YET</p>
      <p className="text-sm text-gray-400 mt-1">ADD ITEMS USING THE FORM ABOVE OR CLICK "NEW PACKAGE" TO ADD WITH DIMENSIONS</p>
    </div>
  );
};

export default EmptyState;
