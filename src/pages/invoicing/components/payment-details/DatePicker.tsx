
import React from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  handleDateChange: (date: Date | undefined, fieldName: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  name,
  value,
  handleDateChange,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}:</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start text-left font-normal border border-gray-300">
            <Calendar className="mr-2 h-4 w-4" />
            {value ? format(new Date(value), "PPP") : "Select date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <CalendarComponent
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => handleDateChange(date, name)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
