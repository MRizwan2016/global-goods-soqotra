
import React from "react";

interface VesselSummaryProps {
  filteredCount: number;
  totalCount: number;
}

const VesselSummary: React.FC<VesselSummaryProps> = ({ filteredCount, totalCount }) => {
  return (
    <div className="text-sm text-gray-500 animate-fade-in">
      Showing <span className="font-semibold text-blue-600">{filteredCount}</span> of <span className="font-semibold text-blue-600">{totalCount}</span> vessels
    </div>
  );
};

export default VesselSummary;
