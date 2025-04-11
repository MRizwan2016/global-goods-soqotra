
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DateTimeSelector from "./details/DateTimeSelector";
import JobTypeSelector from "./details/JobTypeSelector";
import VehicleSelector from "./details/VehicleSelector";

interface JobDetailsSectionProps {
  jobData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isEnabled?: boolean;
}

const JobDetailsSection = ({ jobData, handleInputChange, handleSelectChange, isEnabled = true }: JobDetailsSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 animate-fade-in">
      <h3 className="font-bold text-lg text-gray-800 mb-5 border-b pb-2">JOB DETAILS</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <JobTypeSelector 
          jobType={jobData.jobType} 
          handleSelectChange={handleSelectChange}
        />
        
        <div>
          <Label htmlFor="invoiceNumber" className="font-medium text-gray-700 mb-1 block">
            INVOICE NUMBER
          </Label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={jobData.invoiceNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="Enter invoice number"
            disabled={!isEnabled}
          />
        </div>
        
        <DateTimeSelector 
          date={jobData.date} 
          time={jobData.time} 
          amPm={jobData.amPm} 
          sameDay={jobData.sameDay}
          collectDate={jobData.collectDate}
          jobType={jobData.jobType}
          handleInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
        />
        
        <VehicleSelector 
          vehicle={jobData.vehicle} 
          handleSelectChange={handleSelectChange}
        />
      </div>
    </div>
  );
};

export default JobDetailsSection;
