
import React from "react";
import { AlertCircle } from "lucide-react";

interface StatusIndicatorsProps {
  activeUser?: string;
  isDuplicate?: boolean;
  isEditing?: boolean;
  bookActivationStatus?: string;
  driverName?: string;
  bookAssignedUser?: string;
}

const StatusIndicators: React.FC<StatusIndicatorsProps> = ({
  activeUser,
  isDuplicate,
  isEditing,
  bookActivationStatus,
  driverName,
  bookAssignedUser
}) => {
  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
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
      
      {/* UPB Integration Status */}
      {(bookAssignedUser || driverName || bookActivationStatus) && (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="text-sm font-semibold text-green-800 mb-2">UPB Integration Status:</h4>
          <div className="space-y-1 text-xs">
            {bookAssignedUser && (
              <div className="flex justify-between">
                <span className="text-gray-600">Book Assignment:</span>
                <span className="font-medium text-green-800">{bookAssignedUser}</span>
              </div>
            )}
            {driverName && (
              <div className="flex justify-between">
                <span className="text-gray-600">Driver:</span>
                <span className="font-medium text-green-800">{driverName}</span>
              </div>
            )}
            {bookActivationStatus && (
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className={`font-medium ${bookActivationStatus === 'ACTIVATED' ? 'text-green-800' : 'text-orange-600'}`}>
                  {bookActivationStatus}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      
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
