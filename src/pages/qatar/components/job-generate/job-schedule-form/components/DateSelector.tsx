
import React from "react";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date | undefined) => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({ selectedDate, onDateChange }) => {
  return (
    <div className="mb-3">
      <Label htmlFor="scheduleDate" className="font-bold text-gray-700 mb-1 block">
        SCHEDULE DATE:
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-white border-gray-300 hover:bg-gray-50"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(selectedDate, "dd/MM/yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      
      {/* Alternative display as input field similar to screenshot */}
      <div className="mt-2">
        <Input 
          type="text" 
          id="scheduleDate"
          value={format(selectedDate, "dd/MM/yyyy")}
          readOnly
          className="bg-blue-50 border-blue-200 text-blue-900 font-medium"
        />
      </div>
    </div>
  );
};

export default DateSelector;
