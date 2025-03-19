
import React from "react";

interface PrintHeaderProps {
  scheduleNumber: string;
  formattedDate: string;
  formattedTime: string;
  userName: string;
}

const PrintHeader: React.FC<PrintHeaderProps> = ({ 
  scheduleNumber, 
  formattedDate, 
  formattedTime, 
  userName 
}) => {
  return (
    <div className="text-center mb-4">
      <h1 className="text-2xl font-bold uppercase">
        COLLECTION/ DELIVERY JOB SHEET [ SCHEDULE NO: {scheduleNumber} ] - [SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL]
      </h1>
      <p className="text-sm mt-2">
        Printed Time: {formattedDate} {formattedTime}. Printed By: {userName}
      </p>
    </div>
  );
};

export default PrintHeader;
