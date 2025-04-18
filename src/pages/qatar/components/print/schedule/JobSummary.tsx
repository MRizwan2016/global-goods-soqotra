
import React from "react";
import { QatarJob } from "../../../types/jobTypes";
import JobCountSummary from "./components/JobCountSummary";
import FinancialSummary from "./components/FinancialSummary";
import ItemSummary from "./components/ItemSummary";

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
  jobs,
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
        <JobCountSummary 
          deliveryCount={deliveryCount} 
          collectionCount={collectionCount} 
        />
        
        {/* Financial Summary */}
        <FinancialSummary 
          totalDeliveryAmount={totalDeliveryAmount}
          totalCollectionAmount={totalCollectionAmount}
          totalAmount={totalAmount}
        />
      </div>
      
      {/* Item Summary */}
      <ItemSummary itemCounts={itemCounts} />
    </div>
  );
};

export default JobSummary;
