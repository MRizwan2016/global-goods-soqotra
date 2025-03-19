
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ScheduleNumberFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScheduleNumberField: React.FC<ScheduleNumberFieldProps> = ({ value, onChange }) => {
  return (
    <div className="mb-3">
      <Label htmlFor="scheduleNumber" className="font-bold text-gray-700 mb-1 block">
        SCHEDULE NUMBER:
      </Label>
      <Input
        type="text"
        id="scheduleNumber"
        name="scheduleNumber"
        value={value}
        onChange={onChange}
        className="bg-blue-50 border-blue-200 text-blue-900 font-semibold"
        placeholder="Enter schedule number"
      />
    </div>
  );
};

export default ScheduleNumberField;
