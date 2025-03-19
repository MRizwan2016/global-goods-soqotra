
import React from "react";
import { QatarJob } from "../../../types/jobTypes";

interface JobSummaryProps {
  jobs: QatarJob[];
  deliveryCount: number;
  collectionCount: number;
  totalDeliveryAmount: number;
  totalCollectionAmount: number;
  totalAmount: number;
  itemCounts: Record<string, number>;
}

const JobSummary: React.FC<JobSummaryProps> = ({ 
  deliveryCount, 
  collectionCount, 
  totalDeliveryAmount, 
  totalCollectionAmount, 
  totalAmount, 
  itemCounts 
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      <div>
        {/* Job Counts */}
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
        
        {/* Financial Summary */}
        <div className="border border-blue-300">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-blue-300">
                <td className="p-2 font-bold border-r border-blue-300">TOTAL DELIVERY AMOUNT</td>
                <td className="p-2 text-right">{totalDeliveryAmount}</td>
              </tr>
              <tr className="border-b border-blue-300">
                <td className="p-2 font-bold border-r border-blue-300">TOTAL COLLECTION AMOUNT</td>
                <td className="p-2 text-right">{totalCollectionAmount}</td>
              </tr>
              <tr>
                <td className="p-2 font-bold border-r border-blue-300">TOTAL AMOUNT</td>
                <td className="p-2 text-right">{totalAmount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Item Summary */}
      <div className="border border-blue-300">
        <table className="w-full text-sm">
          <tbody>
            {Object.entries(itemCounts).map(([itemName, count], index) => (
              <tr key={index} className={index < Object.entries(itemCounts).length - 1 ? "border-b border-blue-300" : ""}>
                <td className="p-2 font-bold border-r border-blue-300">{itemName}</td>
                <td className="p-2 text-right">{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobSummary;
