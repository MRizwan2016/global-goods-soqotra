
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  handleDateChange?: (date: Date | undefined, fieldName: string) => void;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  handleDateChange,
  handleInputChange,
}) => {
  // Handle date selection with support for both handler types
  const onDateSelect = (date: Date | undefined) => {
    if (handleDateChange) {
      handleDateChange(date, name);
    } else if (handleInputChange && date) {
      const formattedDate = date.toISOString().split('T')[0];
      const event = {
        target: {
          name: name,
          value: formattedDate,
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleInputChange(event);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}:</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal border border-gray-300">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(new Date(value), "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={onDateSelect}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
