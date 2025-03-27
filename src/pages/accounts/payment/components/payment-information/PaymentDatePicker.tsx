
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface PaymentDatePickerProps {
  date: Date;
  handleDateSelect: (selectedDate: Date | undefined) => void;
}

const PaymentDatePicker: React.FC<PaymentDatePickerProps> = ({
  date,
  handleDateSelect,
}) => {
  return (
    <motion.div 
      className="flex flex-col"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <label className="text-sm font-medium mb-1 text-gray-700 flex items-center gap-1">
        <CalendarIcon className="h-4 w-4 text-teal-600" />
        PAYMENT DATE:
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border-teal-200 hover:bg-teal-50",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-teal-500" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};

export default PaymentDatePicker;
