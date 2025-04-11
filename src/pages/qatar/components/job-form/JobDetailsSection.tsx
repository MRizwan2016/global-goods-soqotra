
import React from "react";
import { Select } from "@/components/ui/select";

interface JobDetailsSectionProps {
  jobData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isEnabled?: boolean;
}

const JobDetailsSection = ({ jobData, handleInputChange, handleSelectChange, isEnabled = true }: JobDetailsSectionProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="font-medium text-gray-900 mb-4">Job Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <Select
            value={jobData.jobType}
            onValueChange={(value) => handleSelectChange("jobType", value)}
            disabled={!isEnabled}
          >
            <option value="COLLECTION">COLLECTION</option>
            <option value="DELIVERY">DELIVERY</option>
          </Select>
        </div>
        
        <div>
          <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Invoice Number
          </label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={jobData.invoiceNumber}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={jobData.date}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            disabled={!isEnabled}
          />
        </div>
        
        <div className="flex space-x-2">
          <div className="flex-1">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
              Time
            </label>
            <input
              type="text"
              id="time"
              name="time"
              value={jobData.time}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded w-full"
              placeholder="HH:MM"
              disabled={!isEnabled}
            />
          </div>
          
          <div className="w-20">
            <label htmlFor="amPm" className="block text-sm font-medium text-gray-700 mb-1">
              AM/PM
            </label>
            <Select
              value={jobData.amPm}
              onValueChange={(value) => handleSelectChange("amPm", value)}
              disabled={!isEnabled}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-1">
            Vehicle
          </label>
          <Select
            value={jobData.vehicle}
            onValueChange={(value) => handleSelectChange("vehicle", value)}
            disabled={!isEnabled}
          >
            <option value="">Select Vehicle</option>
            <option value="V1">Vehicle 1</option>
            <option value="V2">Vehicle 2</option>
            <option value="V3">Vehicle 3</option>
          </Select>
        </div>
        
        <div>
          <label htmlFor="sameDay" className="block text-sm font-medium text-gray-700 mb-1">
            Same Day Service
          </label>
          <Select
            value={jobData.sameDay}
            onValueChange={(value) => handleSelectChange("sameDay", value)}
            disabled={!isEnabled}
          >
            <option value="N">No</option>
            <option value="Y">Yes</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
