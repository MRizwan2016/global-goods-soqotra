
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

const DateTimeSelector = () => {
  const { jobData, handleInputChange, handleSelectChange, isJobNumberGenerated } = useJobForm();

  return (
    <>
      <div className="grid grid-cols-3 gap-2 items-end">
        <div>
          <Label htmlFor="date" className="font-medium text-gray-700 mb-1 block">
            DATE
          </Label>
          <input
            type="text"
            id="date"
            name="date"
            value={jobData.date}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="DD/MM/YYYY"
            disabled={!isJobNumberGenerated}
          />
        </div>
        <div>
          <Label htmlFor="time" className="font-medium text-gray-700 mb-1 block">
            TIME
          </Label>
          <input
            type="text"
            id="time"
            name="time"
            value={jobData.time}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="HH:MM"
            disabled={!isJobNumberGenerated}
          />
        </div>
        <div>
          <Label htmlFor="amPm" className="font-medium text-gray-700 mb-1 block">
            AM/PM
          </Label>
          <Select
            value={jobData.amPm}
            onValueChange={(value) => handleSelectChange("amPm", value)}
            disabled={!isJobNumberGenerated}
          >
            <SelectTrigger id="amPm" className="border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
              <SelectValue placeholder="AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {jobData.jobType === "COLLECTION" && (
        <div className="mt-4">
          <Label htmlFor="sameDay" className="font-medium text-gray-700 mb-1 block">
            SAME-DAY DELIVERY
          </Label>
          <Select
            value={jobData.sameDay}
            onValueChange={(value) => handleSelectChange("sameDay", value)}
            disabled={!isJobNumberGenerated}
          >
            <SelectTrigger id="sameDay" className="border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Y">YES</SelectItem>
              <SelectItem value="N">NO</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {jobData.jobType === "DELIVERY" && (
        <div className="mt-4">
          <Label htmlFor="collectDate" className="font-medium text-gray-700 mb-1 block">
            COLLECT DATE
          </Label>
          <input
            type="text"
            id="collectDate"
            name="collectDate"
            value={jobData.collectDate}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            placeholder="DD/MM/YYYY"
            disabled={!isJobNumberGenerated}
          />
        </div>
      )}
    </>
  );
};

export default DateTimeSelector;
