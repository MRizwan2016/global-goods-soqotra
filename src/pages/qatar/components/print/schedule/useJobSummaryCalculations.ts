
import { useMemo } from "react";
import { QatarJob, JobItem } from "../../../types/jobTypes";

export const useJobSummaryCalculations = (jobs: QatarJob[] = []) => {
  // Calculate job type counts
  const deliveryCount = useMemo(() => 
    jobs.filter(job => job.jobType === "DELIVERY").length, [jobs]);
    
  const collectionCount = useMemo(() => 
    jobs.filter(job => job.jobType === "COLLECTION").length, [jobs]);
  
  // Calculate totals
  const totalCollectionAmount = useMemo(() => 
    jobs
      .filter(job => job.jobType === "COLLECTION")
      .reduce((total, job) => total + (Number(job.advanceAmount) || 0), 0), 
    [jobs]);
    
  const totalDeliveryAmount = useMemo(() => 
    jobs
      .filter(job => job.jobType === "DELIVERY")
      .reduce((total, job) => total + (Number(job.advanceAmount) || 0), 0), 
    [jobs]);
    
  const totalAmount = useMemo(() => 
    totalCollectionAmount + totalDeliveryAmount, 
    [totalCollectionAmount, totalDeliveryAmount]);

  // Group items by name and count packages
  const itemCounts: Record<string, number> = useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach(job => {
      if (job.items && Array.isArray(job.items)) {
        job.items.forEach(item => {
          const itemName = item.itemName || item.name || "Unknown Item";
          const quantity = Number(item.quantity) || 0;
          
          if (counts[itemName]) {
            counts[itemName] += quantity;
          } else {
            counts[itemName] = quantity;
          }
        });
      }
    });
    return counts;
  }, [jobs]);

  // Calculate total package counts for deliveries and collections
  const totalDeliveryPackages = useMemo(() => 
    jobs
      .filter(job => job.jobType === "DELIVERY")
      .reduce((total, job) => {
        if (job.items && Array.isArray(job.items)) {
          return total + job.items.reduce((itemTotal, item) => 
            itemTotal + (Number(item.quantity) || 0), 0);
        }
        return total;
      }, 0), 
    [jobs]);
    
  const totalCollectionPackages = useMemo(() => 
    jobs
      .filter(job => job.jobType === "COLLECTION")
      .reduce((total, job) => {
        if (job.items && Array.isArray(job.items)) {
          return total + job.items.reduce((itemTotal, item) => 
            itemTotal + (Number(item.quantity) || 0), 0);
        }
        return total;
      }, 0), 
    [jobs]);

  return {
    deliveryCount,
    collectionCount,
    totalCollectionAmount,
    totalDeliveryAmount,
    totalAmount,
    itemCounts,
    totalDeliveryPackages,
    totalCollectionPackages
  };
};
