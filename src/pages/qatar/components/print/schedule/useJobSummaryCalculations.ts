
import { useMemo } from "react";
import { QatarJob, JobItem } from "../../../types/jobTypes";

export const useJobSummaryCalculations = (jobs: QatarJob[]) => {
  // Calculate job type counts
  const deliveryCount = useMemo(() => 
    jobs.filter(job => job.jobType === "DELIVERY").length, [jobs]);
    
  const collectionCount = useMemo(() => 
    jobs.filter(job => job.jobType === "COLLECTION").length, [jobs]);
  
  // Calculate totals
  const totalCollectionAmount = useMemo(() => 
    jobs
      .filter(job => job.jobType === "COLLECTION")
      .reduce((total, job) => total + (job.advanceAmount || 0), 0), 
    [jobs]);
    
  const totalDeliveryAmount = useMemo(() => 
    jobs
      .filter(job => job.jobType === "DELIVERY")
      .reduce((total, job) => total + (job.advanceAmount || 0), 0), 
    [jobs]);
    
  const totalAmount = useMemo(() => 
    totalCollectionAmount + totalDeliveryAmount, 
    [totalCollectionAmount, totalDeliveryAmount]);

  // Group items by name
  const itemCounts: Record<string, number> = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach(job => {
      if (job.items) {
        job.items.forEach(item => {
          const itemName = item.itemName;
          if (counts[itemName]) {
            counts[itemName] += item.quantity;
          } else {
            counts[itemName] = item.quantity;
          }
        });
      }
    });
    return counts;
  }, [jobs]);

  return {
    deliveryCount,
    collectionCount,
    totalCollectionAmount,
    totalDeliveryAmount,
    totalAmount,
    itemCounts
  };
};
