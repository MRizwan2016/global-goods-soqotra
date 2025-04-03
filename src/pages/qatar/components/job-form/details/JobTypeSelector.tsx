
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobTypeSelectorProps {
  jobType: string;
  handleSelectChange: (name: string, value: string) => void;
}

const JobTypeSelector = ({ jobType, handleSelectChange }: JobTypeSelectorProps) => {
  return (
    <div className="col-span-2 sm:col-span-1">
      <Label htmlFor="jobType">PERSONAL EFFECTS JOB TYPE:</Label>
      <Select 
        value={jobType || "COLLECTION"} 
        onValueChange={(value) => handleSelectChange("jobType", value)}
      >
        <SelectTrigger id="jobType" className="bg-blue-600 text-white">
          <SelectValue placeholder="SELECT TYPE" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="COLLECTION">COLLECTION OF PERSONAL EFFECTS</SelectItem>
          <SelectItem value="DELIVERY">DELIVERY OF HOUSEHOLD GOODS</SelectItem>
          <SelectItem value="PACKING">PACKING OF HOUSEHOLD ITEMS</SelectItem>
          <SelectItem value="UNPACKING">UNPACKING OF PERSONAL EFFECTS</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobTypeSelector;
