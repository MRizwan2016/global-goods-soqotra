
import React from "react";

interface PrintTimestampProps {
  formattedDate: string;
  formattedTime: string;
  userName: string;
}

const PrintTimestamp: React.FC<PrintTimestampProps> = ({ 
  formattedDate, 
  formattedTime, 
  userName 
}) => {
  return (
    <p className="text-sm mt-2">
      Printed Time: {formattedDate} {formattedTime}. Printed By: {userName}
    </p>
  );
};

export default PrintTimestamp;
