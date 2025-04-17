
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useJobForm } from "../context/JobFormContext";

const RemarksTextarea = () => {
  const { jobData, handleInputChange, isJobNumberGenerated } = useJobForm();

  return (
    <div className="md:col-span-2">
      <Label htmlFor="remarks" className="font-medium text-gray-700 mb-1 block">
        REMARKS:
      </Label>
      <Textarea
        id="remarks"
        name="remarks"
        value={jobData.remarks}
        onChange={handleInputChange}
        placeholder="Enter any additional information about personal effects or household goods"
        className="border border-gray-300 rounded w-full h-24 resize-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
        disabled={!isJobNumberGenerated}
      />
    </div>
  );
};

export default RemarksTextarea;
