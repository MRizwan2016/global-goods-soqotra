
import React from "react";
import { AlertCircle } from "lucide-react";

interface EmptyStateProps {
  type: 'unpaid' | 'paid';
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-700">
        No {type} invoices
      </h3>
      <p className="text-gray-500 mt-2">
        {type === 'unpaid' 
          ? 'All invoices have been paid.' 
          : 'None of your invoices have been paid yet.'}
      </p>
    </div>
  );
};

export default EmptyState;
