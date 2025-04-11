
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
import CitySelector from "./details/CitySelector";

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
          isEnabled={isEnabled}
        />
        
        <div>
          <Label htmlFor="invoiceNumber" className="font-medium text-gray-700 mb-1 block">
            INVOICE NUMBER
          </Label>
          <Select
            value={jobData.invoiceNumber || ""}
            onValueChange={(value) => handleSelectChange("invoiceNumber", value)}
            disabled={!isEnabled}
          >
            <SelectTrigger id="invoiceNumber" className="border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="SELECT INVOICE NUMBER" />
            </SelectTrigger>
            <SelectContent>
              {/* Get invoice numbers from active books */}
              <SelectItem value="GY 13136051">GY 13136051</SelectItem>
              <SelectItem value="GY 13136052">GY 13136052</SelectItem>
              <SelectItem value="GY 13136053">GY 13136053</SelectItem>
              <SelectItem value="GY 13136054">GY 13136054</SelectItem>
              <SelectItem value="GY 13136055">GY 13136055</SelectItem>
            </SelectContent>
          </Select>
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
          isEnabled={isEnabled}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <VehicleSelector 
            vehicle={jobData.vehicle} 
            handleSelectChange={handleSelectChange}
            isEnabled={isEnabled}
          />
          
          <CitySelector 
            city={jobData.city} 
            handleSelectChange={handleSelectChange}
            isEnabled={isEnabled}
            country={jobData.country}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
