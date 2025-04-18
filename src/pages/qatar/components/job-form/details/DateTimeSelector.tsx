
import React from "react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock } from "lucide-react";
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

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourDisplay = hour === 0 ? '12' : hour.toString().padStart(2, '0');
        const timeString = `${hourDisplay}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="date" className="font-medium text-gray-700">
            Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={!isJobNumberGenerated}
                className={`w-full justify-start text-left font-normal ${!isJobNumberGenerated ? 'opacity-50' : ''}`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {jobData.date || "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={jobData.date ? new Date(jobData.date) : undefined}
                onSelect={(date) => handleInputChange({
                  target: { name: 'date', value: date ? format(date, 'dd/MM/yyyy') : '' }
                } as any)}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="time" className="font-medium text-gray-700">
            Time
          </Label>
          <Select
            disabled={!isJobNumberGenerated}
            value={jobData.time}
            onValueChange={(value) => handleSelectChange("time", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {jobData.time || "Select time"}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {generateTimeOptions().map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="amPm" className="font-medium text-gray-700">
            AM/PM
          </Label>
          <Select
            disabled={!isJobNumberGenerated}
            value={jobData.amPm}
            onValueChange={(value) => handleSelectChange("amPm", value as "AM" | "PM")}
          >
            <SelectTrigger id="amPm">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {jobData.jobType === "COLLECTION" && (
        <div>
          <Label htmlFor="sameDay" className="font-medium text-gray-700">
            Same-day Delivery
          </Label>
          <Select
            value={jobData.sameDay}
            onValueChange={(value) => handleSelectChange("sameDay", value)}
            disabled={!isJobNumberGenerated}
          >
            <SelectTrigger id="sameDay">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Y">Yes</SelectItem>
              <SelectItem value="N">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
