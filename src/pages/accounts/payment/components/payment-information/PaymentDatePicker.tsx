
import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface PaymentDatePickerProps {
  date: Date;
  handleDateSelect: (date: Date) => void;
}

const PaymentDatePicker: React.FC<PaymentDatePickerProps> = ({
  date,
  handleDateSelect,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium block text-gray-700">
        Payment Date:
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal h-10"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(date, "MMMM do, yyyy")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PaymentDatePicker;
