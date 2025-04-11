
import React from "react";
import { AlertCircle } from "lucide-react";

interface StatusIndicatorsProps {
  activeUser?: string;
  isDuplicate?: boolean;
  isEditing?: boolean;
}

const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  activeUser,
  isDuplicate,
  isEditing
}) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        {activeUser && (
          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap">
            {activeUser}
          </div>
        )}
        {isDuplicate && !isEditing && (
          <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs md:text-sm whitespace-nowrap">
            Duplicate
          </div>
        )}
      </div>
      
      {isDuplicate && !isEditing && (
        <div className="text-sm text-red-600 flex items-center mt-1">
          <AlertCircle size={14} className="mr-1" />
          This invoice number is already assigned to another customer
        </div>
      )}
    </>
  );
};

export default StatusIndicators;
