
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
    <div className="border p-3 rounded-md mb-2">
      <h3 className="font-bold mb-2">Job Summary</h3>
      <table className="w-full">
        <tbody>
          <tr>
            <td className="py-1">Number of Deliveries</td>
            <td className="text-right py-1">{deliveryCount}</td>
          </tr>
          <tr>
            <td className="py-1">Number of Collections</td>
            <td className="text-right py-1">{collectionCount}</td>
          </tr>
          <tr>
            <td className="py-1 font-semibold">Total Jobs</td>
            <td className="text-right py-1 font-semibold">{deliveryCount + collectionCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default JobCountSummary;
