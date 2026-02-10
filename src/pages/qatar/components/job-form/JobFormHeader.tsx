
import React from "react";
import { Button } from "@/components/ui/button";
import { Hash } from "lucide-react";
import { useJobForm } from "./context/JobFormContext";

interface JobFormHeaderProps {
  isNewJob: boolean;
}

const JobFormHeader: React.FC<JobFormHeaderProps> = ({ isNewJob }) => {
  console.log("JobFormHeader rendering, trying to get context...");
  
  // Try to get the context with error handling
  let contextData;
  try {
    contextData = useJobForm();
    console.log("JobFormHeader: Successfully got context:", contextData);
  } catch (error) {
    console.error("JobFormHeader: Failed to get context:", error);
    throw error; // Re-throw to maintain the error behavior
  }
  
  const { jobData, handleInputChange, isJobNumberGenerated, handleGenerateJobNumber } = contextData;
  
  return (
    <div className="col-span-2 flex items-center space-x-3 mb-2">
      <div className="flex-1 relative">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <label htmlFor="jobNumber" className="block text-sm font-medium text-gray-700 mb-1">
              JOB NUMBER
            </label>
            <input
              type="text"
              id="jobNumber"
              name="jobNumber"
              value={jobData.jobNumber}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded w-full bg-gray-50 font-bold text-lg"
              readOnly
              placeholder={isJobNumberGenerated ? "" : "Job number will be auto-generated"}
            />
          </div>
          {isNewJob && !isJobNumberGenerated && (
            <div className="mt-6">
               <Button
                type="button"
                onClick={handleGenerateJobNumber}
                className="bg-[#3b5998] hover:bg-[#1e2a3a] transition-colors"
              >
                <Hash className="mr-1 h-4 w-4" /> Generate Job No
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobFormHeader;
