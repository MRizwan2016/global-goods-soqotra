
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimeSelectorProps {
  date: string;
  time: string;
  amPm: string;
  sameDay: string;
  collectDate?: string;
  jobType: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  isEnabled?: boolean;
}

const DateTimeSelector = ({
  date,
  time,
  amPm,
  sameDay,
  collectDate,
  jobType,
  handleInputChange,
  handleSelectChange,
  isEnabled = true
}: DateTimeSelectorProps) => {
  const [showCollectDate, setShowCollectDate] = useState(jobType === "DELIVERY" && sameDay === "N");

  useEffect(() => {
    setShowCollectDate(jobType === "DELIVERY" && sameDay === "N");
  }, [jobType, sameDay]);

  return (
    <div className="col-span-1 md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <Label htmlFor="date" className="font-medium text-gray-700 mb-1 block">DATE:</Label>
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
          disabled={!isEnabled}
        />
      </div>
      
      <div>
        <Label htmlFor="time" className="font-medium text-gray-700 mb-1 block">TIME:</Label>
        <input
          type="time"
          id="time"
          name="time"
          value={time}
          onChange={handleInputChange}
          className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
          disabled={!isEnabled}
        />
      </div>
      
      <div>
        <Label htmlFor="amPm" className="font-medium text-gray-700 mb-1 block">AM/PM:</Label>
        <Select
          value={amPm}
          onValueChange={(value) => handleSelectChange("amPm", value)}
          disabled={!isEnabled}
        >
          <SelectTrigger id="amPm" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="sameDay" className="font-medium text-gray-700 mb-1 block">SAME DAY SERVICE:</Label>
        <Select
          value={sameDay}
          onValueChange={(value) => handleSelectChange("sameDay", value)}
          disabled={!isEnabled}
        >
          <SelectTrigger id="sameDay" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <SelectValue placeholder="SAME DAY?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Y">YES</SelectItem>
            <SelectItem value="N">NO</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {showCollectDate && (
        <div className="col-span-2">
          <Label htmlFor="collectDate" className="font-medium text-gray-700 mb-1 block">COLLECT DATE:</Label>
          <input
            type="date"
            id="collectDate"
            name="collectDate"
            value={collectDate}
            onChange={handleInputChange}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
            disabled={!isEnabled}
          />
        </div>
      )}
    </div>
  );
};

export default DateTimeSelector;
