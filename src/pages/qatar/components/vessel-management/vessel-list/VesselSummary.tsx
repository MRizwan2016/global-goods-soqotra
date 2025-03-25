
import React from "react";

interface VesselSummaryProps {
  filteredCount: number;
  totalCount: number;
}

const VesselSummary: React.FC<VesselSummaryProps> = ({ filteredCount, totalCount }) => {
  return (
    <div className="text-sm text-gray-500">
      Showing {filteredCount} of {totalCount} vessels
    </div>
  );
};

export default VesselSummary;
