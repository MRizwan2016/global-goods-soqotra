
import React from "react";

interface PrintHeaderProps {
  title: string;
  date: string;
  startDate?: string;
  endDate?: string;
  extraInfo?: React.ReactNode;
}

const PrintHeader: React.FC<PrintHeaderProps> = ({
  title,
  date,
  startDate,
  endDate,
  extraInfo
}) => {
  return (
    <div className="print:text-center print:mb-4 hidden print:block">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>Date: {date}</p>
      {startDate && endDate && (
        <p>Period: {startDate} to {endDate}</p>
      )}
      {extraInfo}
    </div>
  );
};

export default PrintHeader;
