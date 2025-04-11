
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useJobForm } from "../context/JobFormContext";

const JobTypeSelector = () => {
  const { jobData, handleSelectChange, isJobNumberGenerated } = useJobForm();

  return (
    <div>
      <Label htmlFor="jobType" className="font-medium text-gray-700 mb-1 block">
        JOB TYPE
      </Label>
      <Select
        value={jobData.jobType}
        onValueChange={(value) => handleSelectChange("jobType", value)}
        disabled={!isJobNumberGenerated}
      >
        <SelectTrigger id="jobType" className="border border-gray-300 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <SelectValue placeholder="SELECT JOB TYPE" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="COLLECTION">COLLECTION</SelectItem>
          <SelectItem value="DELIVERY">DELIVERY</SelectItem>
          <SelectItem value="PACKING">PACKING</SelectItem>
          <SelectItem value="UNPACKING">UNPACKING</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobTypeSelector;
