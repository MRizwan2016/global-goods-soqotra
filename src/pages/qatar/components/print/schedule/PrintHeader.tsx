
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
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <img src="/soqotra-logo.png" alt="Soqotra Logo" className="h-10 mr-2" />
        <h1 className="text-2xl font-bold uppercase">
          SOQOTRA LOGISTICS SERVICES, TRANSPORTATION & TRADING WLL
        </h1>
      </div>
      <h2 className="text-xl font-bold uppercase text-center">
        COLLECTION/ DELIVERY JOB SHEET [ SCHEDULE NO: {scheduleNumber} ]
      </h2>
      <p className="text-sm mt-2">
        Printed Time: {formattedDate} {formattedTime}. Printed By: {userName}
      </p>
    </div>
  );
};

export default PrintHeader;
