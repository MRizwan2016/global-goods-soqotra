
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
    <div>
      <Label htmlFor="jobType" className="font-medium text-gray-700 mb-1 block">JOB TYPE:</Label>
      <Select 
        value={jobType || "COLLECTION"} 
        onValueChange={(value) => handleSelectChange("jobType", value)}
      >
        <SelectTrigger id="jobType" className="bg-blue-600 text-white hover:bg-blue-700 transition-colors">
          <SelectValue placeholder="SELECT TYPE" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="COLLECTION">COLLECTION</SelectItem>
          <SelectItem value="DELIVERY">DELIVERY</SelectItem>
          <SelectItem value="PACKING">PACKING</SelectItem>
          <SelectItem value="UNPACKING">UNPACKING</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default JobTypeSelector;
