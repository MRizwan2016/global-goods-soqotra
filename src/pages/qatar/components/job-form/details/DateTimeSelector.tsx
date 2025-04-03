
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
        <Label htmlFor="jobDate">JOB DATE:</Label>
        <Input 
          id="jobDate"
          name="date"
          type="text"
          value={date}
          onChange={handleInputChange}
          placeholder="DD/MM/YYYY"
        />
      </div>
      
      <div>
        <Label htmlFor="jobTime">JOB TIME:</Label>
        <Input 
          id="jobTime"
          name="time"
          value={time}
          onChange={handleInputChange}
          placeholder="00:00"
        />
      </div>
      
      <div>
        <Label htmlFor="amPm">AM/PM:</Label>
        <Select 
          value={amPm || "AM"} 
          onValueChange={(value) => handleSelectChange("amPm", value)}
        >
          <SelectTrigger id="amPm" className="bg-blue-600 text-white">
            <SelectValue placeholder="Select AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="sameDay">SAME DAY JOB:</Label>
        <Select 
          value={sameDay || "N"} 
          onValueChange={(value) => handleSelectChange("sameDay", value)}
        >
          <SelectTrigger id="sameDay" className="bg-blue-600 text-white">
            <SelectValue placeholder="Select Same Day" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Y">YES</SelectItem>
            <SelectItem value="N">NO</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {jobType === "COLLECTION" && (
        <div>
          <Label htmlFor="collectDate">COLLECT DATE:</Label>
          <Input 
            id="collectDate"
            name="collectDate"
            value={collectDate || ""}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
          />
        </div>
      )}
    </>
  );
};

export default DateTimeSelector;
