
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ScheduleNumberFieldProps } from "../types";

const ScheduleNumberField: React.FC<ScheduleNumberFieldProps> = ({ 
  value, 
  onChange,
  readonly = false
}) => {
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
        placeholder="Auto-generated"
        readOnly={readonly}
      />
      {readonly && (
        <p className="text-xs text-gray-500 mt-1">
          Schedule number is auto-generated for uniqueness
        </p>
      )}
    </div>
  );
};

export default ScheduleNumberField;
