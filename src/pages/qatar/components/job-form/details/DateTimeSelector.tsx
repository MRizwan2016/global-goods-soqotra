
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

const DateTimeSelector = ({ 
  date, 
  time, 
  amPm, 
  sameDay, 
  collectDate, 
  jobType,
  handleInputChange, 
  handleSelectChange 
}: DateTimeSelectorProps) => {
  return (
    <>
      <div>
        <Label htmlFor="jobDate" className="font-medium text-gray-700 mb-1 block">DATE:</Label>
        <Input 
          id="jobDate"
          name="date"
          type="text"
          value={date}
          onChange={handleInputChange}
          placeholder="DD/MM/YYYY"
          className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <Label htmlFor="jobTime" className="font-medium text-gray-700 mb-1 block">TIME:</Label>
          <Input 
            id="jobTime"
            name="time"
            value={time}
            onChange={handleInputChange}
            placeholder="HH:MM"
            className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
          />
        </div>
        
        <div>
          <Label htmlFor="amPm" className="font-medium text-gray-700 mb-1 block">AM/PM:</Label>
          <Select 
            value={amPm || "AM"} 
            onValueChange={(value) => handleSelectChange("amPm", value)}
          >
            <SelectTrigger id="amPm" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors h-[38px]">
              <SelectValue placeholder="Select AM/PM" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AM">AM</SelectItem>
              <SelectItem value="PM">PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="sameDay" className="font-medium text-gray-700 mb-1 block">SAME DAY SERVICE:</Label>
        <Select 
          value={sameDay || "N"} 
          onValueChange={(value) => handleSelectChange("sameDay", value)}
        >
          <SelectTrigger id="sameDay" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <SelectValue placeholder="Select Same Day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="N">NO</SelectItem>
            <SelectItem value="Y">YES</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {jobType === "COLLECTION" && (
        <div>
          <Label htmlFor="collectDate" className="font-medium text-gray-700 mb-1 block">COLLECT DATE:</Label>
          <Input 
            id="collectDate"
            name="collectDate"
            value={collectDate || ""}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
            className="focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-colors"
          />
        </div>
      )}
    </>
  );
};

export default DateTimeSelector;
