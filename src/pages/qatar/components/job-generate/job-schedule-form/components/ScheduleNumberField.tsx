
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ScheduleNumberFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ScheduleNumberField: React.FC<ScheduleNumberFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <Label htmlFor="scheduleNumber">SCHEDULE NUMBER:</Label>
      <Input
        id="scheduleNumber"
        name="scheduleNumber"
        value={value}
        onChange={onChange}
        className="bg-gray-100"
      />
    </div>
  );
};

export default ScheduleNumberField;
