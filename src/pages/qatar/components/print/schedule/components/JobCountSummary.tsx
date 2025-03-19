
import React from "react";

interface JobCountSummaryProps {
  deliveryCount: number;
  collectionCount: number;
}

const JobCountSummary: React.FC<JobCountSummaryProps> = ({ 
  deliveryCount, 
  collectionCount 
}) => {
  return (
    <div className="border border-blue-300 mb-4">
      <table className="w-full text-sm">
        <tbody>
          <tr className="border-b border-blue-300">
            <td className="p-2 font-bold border-r border-blue-300">NUMBER OF DELIVERIES</td>
            <td className="p-2 text-right">{deliveryCount}</td>
          </tr>
          <tr>
            <td className="p-2 font-bold border-r border-blue-300">NUMBER OF COLLECTIONS</td>
            <td className="p-2 text-right">{collectionCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobCountSummary;
