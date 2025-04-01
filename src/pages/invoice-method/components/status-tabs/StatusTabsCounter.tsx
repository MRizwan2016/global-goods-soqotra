
import React from "react";

interface StatusTabsCounterProps {
  count: number;
  type: 'unpaid' | 'paid';
}

const StatusTabsCounter: React.FC<StatusTabsCounterProps> = ({ count, type }) => {
  const colorClass = type === 'unpaid' 
    ? "bg-amber-100 text-amber-800" 
    : "bg-green-100 text-green-800";
    
  return (
    <span className={`ml-2 ${colorClass} px-2 py-0.5 rounded-full text-xs font-medium`}>
      {count}
    </span>
  );
};

export default StatusTabsCounter;
