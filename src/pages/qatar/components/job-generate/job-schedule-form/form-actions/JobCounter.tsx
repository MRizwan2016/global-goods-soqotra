
import React from "react";
import { QatarJob } from "../../../../types/jobTypes";
import { Badge } from "@/components/ui/badge";
import { Calendar, Truck } from "lucide-react";

interface JobCounterProps {
  selectedJobs: QatarJob[];
}

const JobCounter: React.FC<JobCounterProps> = ({ selectedJobs }) => {
  // Count collections and deliveries
  const collections = selectedJobs.filter(job => job.jobType === "COLLECTION").length;
  const deliveries = selectedJobs.filter(job => job.jobType === "DELIVERY").length;

  return (
    <div className="mb-3">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Badge variant="outline" className="text-sm px-3 py-1 bg-blue-50 border-blue-200">
          <Truck size={14} className="mr-1" />
          Selected Jobs: <span className="font-bold ml-1">{selectedJobs.length}</span>
        </Badge>
        
        {selectedJobs.length > 0 && (
          <>
            <Badge variant="outline" className="text-sm px-3 py-1 bg-green-50 border-green-200 text-green-700">
              Collections: <span className="font-bold ml-1">{collections}</span>
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1 bg-amber-50 border-amber-200 text-amber-700">
              Deliveries: <span className="font-bold ml-1">{deliveries}</span>
            </Badge>
          </>
        )}
      </div>
      
      {selectedJobs.length > 0 && (
        <div className="text-xs text-gray-500 flex items-center">
          <Calendar size={12} className="mr-1" />
          Schedule for {new Date().toLocaleDateString('en-GB', { 
            weekday: 'long',
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      )}
    </div>
  );
};

export default JobCounter;
